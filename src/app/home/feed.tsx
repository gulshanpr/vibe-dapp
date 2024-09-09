'use client'
import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CustomSlider from './slider';
import { useRouter } from 'next/navigation';



const FeedCard = () => {
    const router = useRouter();
    const ipfsHashes = [
        "bafkreidgvzaybua26xwudyztqusbifzol5vmsjcybfv7xc3jksvyoewgnq",
        "bafybeihbep3mmcevogtrhk3ionk4cx4lfdzrax5l6ifgj4l4wfdiph2baa",
        "bafybeiackjb3p756alfnd2545itaua36yn7qc4i2wnfuddtqorlxnlqkgm",
        "bafybeih24jxktqxb5dybh6mdeawv2cig6lx6skrz2ggbeleemgm6ompswi",
        "bafybeigwzwscmua7wxgat6zwgc25xxnhqwfk7rjixnelsxx52dvf4ljz2a",
        "bafybeibu5dqeev4es72rchsrxi4fzblmyfsduywmlzyfvhgaqpi3orti5e",
    ];

    const [auraOpened, setAuraOpened] = useState(false);
    const [vibeOpened, setVibeOpened] = useState(false);
    const [customVibe, setCustomVibe] = useState<boolean>(false);

    const handleUploadToggle = () => {
        console.log("Upload button clicked");
        router.push('/upload');

    }

    const handleSwipe = (direction: string, index: number) => {
        console.log(`You swiped ${direction} on card ${index + 1}`);
    };

    function handleLightModeClick(index: number) {
        console.log("LightMode icon clicked for item", index);
        setAuraOpened(prevState => !prevState);
    }

    function handleWhatshotClick(index: number) {
        console.log("Whatshot icon clicked for item", index);
        setVibeOpened(prevState => !prevState);
    }

    const handleCustonVibe = () => {
        console.log("Custom Vibe button clicked");
        setCustomVibe(prevState => !prevState);
    }

    const handleCustomVibeButton = () => {
        console.log("Custom Vibe button clicked");
        router.push('vibe-place')
    }

    const handleVibeSelect = (value: string) => {
        console.log("Vibe selected", value);
    }

    const handleVibe = () => {
        console.log("Vibe button clicked");
    }

    return (
        <div className="mt-28 space-x-[20px] flex justify-center relative">
            <div className="w-[550px] relative">
                {ipfsHashes.map((hash, index) => (
                    <div>
                        <TinderCard
                            key={index}
                            onSwipe={(direction) => handleSwipe(direction, index)}
                        >
                            <Card className="w-full absolute pr-[60px]">
                                <CardHeader></CardHeader>
                                <CardContent className="flex items-center justify-between">
                                    <img
                                        src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${hash}`}
                                        alt={`Image from IPFS hash ${hash}`}
                                    />
                                    <div className="mt-[100px] ml-[20px] space-y-[20px]">
                                        <div className=''>
                                            <LightModeOutlinedIcon sx={{ fontSize: 50 }}
                                                onClick={() => handleLightModeClick(index)}
                                            />
                                        </div>
                                        <div className=''>
                                            <WhatshotOutlinedIcon sx={{ fontSize: 50 }}
                                                onClick={() => handleWhatshotClick(index)}
                                            />
                                        </div>
                                        <div className=''>
                                            <AddBoxOutlinedIcon
                                                sx={{ fontSize: 50 }}
                                                onClick={() => handleUploadToggle()
                                                }
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TinderCard>

                    </div>
                ))}

            </div>




            <div className="ml-[20px] space-y-[20px] ">
                <div>
                    {auraOpened && (
                        <Card className="flex flex-col justify-center items-center pr-[10px]">
                            <CardHeader className="text-center">
                                <p>Give aura 🥶</p>
                            </CardHeader>
                            <CardContent className="flex justify-center items-center">
                                <div>
                                    <CustomSlider min={-80} max={80} step={0.1} />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
                <div className='flex'>
                    {vibeOpened && (
                        <Card className="flex flex-col justify-center items-center">
                            <CardHeader className="text-center">
                                <p>Give me vibe ❤️‍🔥</p>
                            </CardHeader>
                            <CardContent className="flex justify-center items-center">
                                <div className="text-center">
                                    <Select onValueChange={handleVibeSelect}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Theme" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="light">Hot🥵🥵</SelectItem>
                                            <SelectItem value="dark">Cool😎😎</SelectItem>
                                            <SelectItem value="system">Eww🤮🤮</SelectItem>
                                            <SelectItem value="system">Badie🤤🤤</SelectItem>
                                            <SelectItem value="system">Cute🥺🥺</SelectItem>
                                            <SelectItem value="system">Sexy🔥🔥</SelectItem>
                                            <SelectItem value="system">Uncle🥸🥸</SelectItem>
                                            <div className='mx-[32px]'>
                                                <AddOutlinedIcon
                                                    sx={{ fontSize: 20 }} onClick={
                                                        () => handleCustonVibe()
                                                    }
                                                />
                                            </div>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className='mx-[20px]'>
                        {customVibe && vibeOpened && (
                            <div>
                                <Card className="flex flex-col justify-center items-center">
                                    <CardHeader className="text-center">
                                        <p>Buy custom vibe</p>
                                    </CardHeader>
                                    <CardContent className="flex justify-center items-center">
                                        <Button className="bg-black text-white" variant="outline" onClick={handleCustomVibeButton}>Buy Vibe-tag</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div >
    );
}


export default FeedCard;
