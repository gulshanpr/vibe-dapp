'use client'
import React, { useEffect, useState } from 'react';
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { AnimatedSubscribeButton } from "@/components/magicui/animated-subscribe-button";
import Image from 'next/image';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import { yellow } from '@mui/material/colors';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Import the external function and web3auth utilities
import { handleTest } from '@/utils/web3authTransaction';
import { initializeWeb3Auth, web3auth } from '@/utils/web3auth';

const Components = () => {
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize Web3Auth when the component mounts
    useEffect(() => {
        const initWeb3Auth = async () => {
            try {
                await initializeWeb3Auth();
                setIsInitialized(true);
            } catch (error) {
                console.error('Error initializing Web3Auth:', error);
            }
        };

        initWeb3Auth();
    }, []);

    // Updated onBuy function that uses web3auth and isInitialized
    const onBuy = async (item: string) => {
        try {
            // Call the handleTest utility with web3auth and isInitialized
            await handleTest(web3auth, isInitialized);
            console.log(`Transaction initiated for ${item}`);
        } catch (error) {
            console.error(`Error buying ${item}:`, error);
        }
    };

    return (
        <div className='ml-[200px] flex space-x-10'>
            {/* First Card */}
            <div className=''>
                <Card className="w-[200px] h-[300px] items-center justify-center text-center">
                    <CardContent>
                        <div className='flex justify-center mt-[50px]'>
                            <Image src="/images/image.png" alt="dogo" width={100} height={100} />
                        </div>
                        <div className='flex justify-center'>
                            <AnimatedSubscribeButton
                                buttonColor="#000000"
                                buttonTextColor="#ffffff"
                                subscribeStatus={false}
                                initialText={<span className="group inline-flex items-center">buy</span>}
                                changeText={<span className="group inline-flex items-center">bought</span>}
                                pendingText={<span className="group inline-flex items-center">buying...</span>}
                                // Call the onBuy function here
                                onClick={() => onBuy('dogo image')}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Cards */}
            <div>
                <Card className="w-[200px] h-[300px] items-center justify-center text-center">

                    <CardHeader>
                        <CardTitle>Buy Aura Point</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <LightModeOutlinedIcon sx={{ fontSize: 90, color: yellow[500] }} />
                        <div className='flex justify-center'>
                            <AnimatedSubscribeButton
                                buttonColor="#000000"
                                buttonTextColor="#ffffff"
                                subscribeStatus={false}
                                initialText={<span className="group inline-flex items-center">buy</span>}
                                changeText={<span className="group inline-flex items-center">bought</span>}
                                pendingText={<span className="group inline-flex items-center">buying...</span>}
                                onClick={() => onBuy('Aura Point')}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card className="w-[200px] h-[300px] items-center justify-center text-center">

                    <CardHeader>
                        <CardTitle>Swap/Trade Aura Point</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WhatshotOutlinedIcon sx={{ fontSize: 90, color: yellow[500] }} />
                        <div className='flex justify-center'>
                            <AnimatedSubscribeButton
                                buttonColor="#000000"
                                buttonTextColor="#ffffff"
                                subscribeStatus={false}
                                initialText={<span className="group inline-flex items-center">buy</span>}
                                changeText={<span className="group inline-flex items-center">bought</span>}
                                pendingText={<span className="group inline-flex items-center">buying...</span>}
                                onClick={() => onBuy('Swap Aura Point')}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div>
                <Card className="w-[200px] h-[300px] items-center justify-center text-center">
                    <CardHeader>
                        <div className='mt-[40px]'>
                            <CardTitle>Buy Custom Vibe-tags</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='flex justify-center'>
                            <AnimatedSubscribeButton
                                buttonColor="#000000"
                                buttonTextColor="#ffffff"
                                subscribeStatus={false}
                                initialText={<span className="group inline-flex items-center">buy</span>}
                                changeText={<span className="group inline-flex items-center">bought</span>}
                                pendingText={<span className="group inline-flex items-center">buying...</span>}
                                onClick={() => onBuy('Custom Vibe-tags')}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* <div>
                <Card className="w-[200px] h-[300px] items-center justify-center text-center">
                    <CardHeader>
                        <CardTitle>Do Something</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WhatshotOutlinedIcon sx={{ fontSize: 90, color: yellow[500] }} />
                        <div className='flex justify-center'>
                            <AnimatedSubscribeButton
                                buttonColor="#000000"
                                buttonTextColor="#ffffff"
                                subscribeStatus={false}
                                initialText={<span className="group inline-flex items-center">buy</span>}
                                changeText={<span className="group inline-flex items-center">bought</span>}
                                pendingText={<span className="group inline-flex items-center">buying...</span>}
                                onClick={() => onBuy('Something')}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div> */}
        </div>
    );
};

export default Components;
