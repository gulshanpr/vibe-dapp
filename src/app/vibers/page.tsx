'use client';
import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const posts = [
    { id: 1, image: `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/bafybeiackjb3p756alfnd2545itaua36yn7qc4i2wnfuddtqorlxnlqkgm`, likes: 1200, comments: 45 },
    { id: 2, image: `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/bafybeibu5dqeev4es72rchsrxi4fzblmyfsduywmlzyfvhgaqpi3orti5e`, likes: 980, comments: 32 },
    { id: 3, image: `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/bafybeigwzwscmua7wxgat6zwgc25xxnhqwfk7rjixnelsxx52dvf4ljz2a`, likes: 1500, comments: 60 },
    { id: 4, image: `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/bafybeih24jxktqxb5dybh6mdeawv2cig6lx6skrz2ggbeleemgm6ompswi`, likes: 2200, comments: 78 },
    { id: 5, image: `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/bafybeiackjb3p756alfnd2545itaua36yn7qc4i2wnfuddtqorlxnlqkgm`, likes: 890, comments: 25 },
    { id: 6, image: `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/bafybeigwzwscmua7wxgat6zwgc25xxnhqwfk7rjixnelsxx52dvf4ljz2a`, likes: 1700, comments: 55 },
    { id: 5, image: `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/bafybeiackjb3p756alfnd2545itaua36yn7qc4i2wnfuddtqorlxnlqkgm`, likes: 890, comments: 25 },
    { id: 6, image: `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/bafybeigwzwscmua7wxgat6zwgc25xxnhqwfk7rjixnelsxx52dvf4ljz2a`, likes: 1700, comments: 55 },
  ];
  const vibeTags = ["Hot🥵🥵", "Cool😎😎", "Eww🤮🤮", "Badie🤤🤤", "Cute🥺🥺"];

  return (
    <div>
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <header>
        <div className="container mx-auto px-4 flex justify-between items-center">
         
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative h-80 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
            <img
              src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/bafybeiackjb3p756alfnd2545itaua36yn7qc4i2wnfuddtqorlxnlqkgm`}
              alt="Profile"
              className="absolute left-8 -bottom-16 w-32 h-32 rounded-full border-4 border-white shadow-lg transition-all duration-500 hover:scale-105"
            />
          </div>
          <div className="pt-20 pb-8 px-8">
            <div className="flex justify-between items-start mb-6 space-y-9">
              <div className='space-y-2'>
              <b>Wallet Address:</b> 0x1234567890abcdef1234567890abcdef12345678
                <h2 className="text-2xl font-bold space-y-9">Vibe Tags</h2>
                <p className="text-gray-500">Vibes that you love</p>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {vibeTags.map((tag, index) => (
                    <li key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </li>
                  ))}
                </ul>
              <div className='space-y-20'>
                <b>Total Aura Points:</b> 50
              </div>
              </div>
            
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300">
                Follow
              </button>
            </div>
            <div className="flex justify-start space-x-8 mb-8">
              {[
                { label: 'Posts', value: 245 },
                { label: 'Followers', value: '14.3k' },
                { label: 'Following', value: 892 },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="block font-bold text-2xl text-gray-800">{stat.value}</span>
                  <span className="text-gray-600">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 -mx-8 px-8 pt-4">
              <div className="flex space-x-8">
                {['Posts', 'Saved', 'Tagged'].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-4 px-2 font-semibold transition-colors duration-300 ${
                      activeTab === tab.toLowerCase()
                        ? 'text-blue-500 border-b-2 border-blue-500'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      <div className="mt-12 border-2 border-grey-300 rounded-lg p-4">
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative w-[300px] h-[255px] group overflow-hidden rounded-2xl shadow-md transition-transform duration-300 hover:scale-105"
            >
              <img src={post.image}  className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                  <p className="font-semibold">{post.likes} Aura's</p>
                  <p>{post.comments} comments</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </main>
    </div>
    </div>
    
  );
};

export default ProfilePage;