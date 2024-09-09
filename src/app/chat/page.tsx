'use client';

import React, { useEffect, useRef, useState } from 'react';
import { initializeWeb3Auth, web3auth } from '@/utils/web3auth';
import { Client, Conversation, DecodedMessage } from '@xmtp/xmtp-js';
import { ethers, Signer } from 'ethers';
import { IProvider } from '@web3auth/base';

interface TempMessage extends Omit<DecodedMessage, 'id'> {
  isTemporary: boolean;
}

const XMTPChat = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [signer, setSigner] = useState<Signer | null>(null);
  const [isXmtpInitialized, setIsXmtpInitialized] = useState<boolean>(false);
  const [messages, setMessages] = useState<{ [peerAddress: string]: (DecodedMessage | TempMessage)[] }>({});
  const [newMessage, setNewMessage] = useState<string>('');
  const [peerAddress, setPeerAddress] = useState<string>('');
  const [currentPeerAddress, setCurrentPeerAddress] = useState<string>('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const clientRef = useRef<Client | null>(null);
  const conversationRef = useRef<Conversation | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeWeb3Auth();
  }, []);

  useEffect(() => {
    if (isConnected && !isXmtpInitialized) {
      initXmtp();
    }
  }, [isConnected, isXmtpInitialized]);

  useEffect(() => {
    if (isXmtpInitialized) {
      listenForNewConversations();
    }
  }, [isXmtpInitialized]);

  useEffect(() => {
    if (isXmtpInitialized) {
      conversations.forEach((conversation) => {
        listenForMessages(conversation);
      });
    }
  }, [conversations]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectWallet = async () => {
    try {
      if (web3auth.connected) {
        const provider = new ethers.providers.Web3Provider(web3auth.provider as IProvider);
        const signer = provider.getSigner();
        setSigner(signer);
        const address = await signer.getAddress();
        setAddress(address);
        setIsConnected(true);
      } else {
        console.log('Not connected');
      }
    } catch (error) {
      console.log('Error connecting wallet:', error);
    }
  };

  const initXmtp = async () => {
    if (!signer) {
      console.log('Signer is not available');
      return;
    }
    try {
      const xmtp = await Client.create(signer, { env: 'dev' });
      clientRef.current = xmtp;
      setIsXmtpInitialized(true);
      loadConversations();
    } catch (error) {
      console.log('Error initializing XMTP client:', error);
    }
  };

  const loadConversations = async () => {
    try {
      if (clientRef.current) {
        const convos = await clientRef.current.conversations.list();
        setConversations(convos);
        for (const conversation of convos) {
          const msgs = await conversation.messages({
            startTime: new Date(new Date().setDate(new Date().getDate() - 30)), // Last 30 days
            endTime: new Date(),
          });
          setMessages((prev) => ({
            ...prev,
            [conversation.peerAddress]: msgs,
          }));
        }
      }
    } catch (error) {
      console.log('Error loading conversations:', error);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const listenForNewConversations = async () => {
    try {
      if (clientRef.current) {
        const stream = await clientRef.current.conversations.stream();
        for await (const conversation of stream) {
          console.log(`New conversation started with ${conversation.peerAddress}`);
          setConversations((prev) => [...prev, conversation]);
          listenForMessages(conversation);
        }
      }
    } catch (error) {
      console.log('Error listening for new conversations:', error);
    }
  };

  const listenForMessages = async (conversation: Conversation) => {
    try {
      console.log(`Listening for messages in conversation with ${conversation.peerAddress}`);
      const stream = await conversation.streamMessages();
      for await (const message of stream) {
        console.log(`Received message: ${message.content} from ${message.senderAddress}`);
        setMessages(prev => ({
          ...prev,
          [conversation.peerAddress]: [...(prev[conversation.peerAddress] || []), message]
        }));
      }
    } catch (error) {
      console.log('Error listening for messages:', error);
    }
  };

  const startNewConversation = async () => {
    if (!clientRef.current || !peerAddress) {
      console.log('XMTP client not initialized or peer address not set');
      return;
    }
    try {
      if (await clientRef.current.canMessage(peerAddress)) {
        const conversation = await clientRef.current.conversations.newConversation(peerAddress);
        conversationRef.current = conversation;
        setCurrentPeerAddress(peerAddress);
        setConversations((prev) => [...prev, conversation]);
        listenForMessages(conversation);
      } else {
        console.log("Can't message because the user is not on the network.");
      }
    } catch (error) {
      console.log('Error starting new conversation:', error);
    }
  };

  const sendMessage = async () => {
    if (conversationRef.current && newMessage.trim() !== '') {
      try {
        await conversationRef.current.send(newMessage);
        setNewMessage('');
      } catch (error) {
        console.log('Error sending message:', error);
      }
    }
  };



  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {!isConnected ? (
        <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      ) : !isXmtpInitialized ? (
        <div>Initializing XMTP...</div>
      ) : (
        <div className="w-full max-w-4xl flex">
          <div className="w-1/3 pr-4">
            <h2 className="text-xl font-bold mb-4">Conversations</h2>
            {conversations.map((conv, index) => (
              <div
                key={index}
                className={`p-2 mb-2 cursor-pointer ${conv.peerAddress === currentPeerAddress ? 'bg-blue-100' : 'bg-gray-100'
                  }`}
                onClick={() => {
                  setCurrentPeerAddress(conv.peerAddress);
                  conversationRef.current = conv;
                }}
              >
                {truncateAddress(conv.peerAddress)}
              </div>
            ))}

            <div className="mt-4">
              <input
                type="text"
                value={peerAddress}
                onChange={(e) => setPeerAddress(e.target.value)}
                className="w-full border rounded px-4 py-2"
                placeholder="Enter new peer address"
              />
              <button
                onClick={startNewConversation}
                className="mt-2 bg-purple-500 text-white px-4 py-2 rounded w-full"
              >
                Start New Chat
              </button>
            </div>
          </div>
          <div className="w-2/3">
            {currentPeerAddress && (
              <>
                <h2 className="text-xl font-bold mb-4">Chat with {currentPeerAddress}</h2>
                <div ref={chatContainerRef} className="bg-gray-100 p-4 rounded-lg mb-4 h-96 overflow-y-auto">
                  {messages[currentPeerAddress]?.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 ${msg.senderAddress === address ? 'text-right' : 'text-left'}`}
                    >
                      <span
                        className={`inline-block p-2 rounded ${msg.senderAddress === address ? 'bg-blue-200' : 'bg-gray-200'
                          }`}
                      >
                        {msg.content}
                      </span>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full border rounded px-4 py-2"
                  placeholder="Type a message..."
                />
                <button
                  onClick={sendMessage}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded w-full"
                >
                  Send
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default XMTPChat;
