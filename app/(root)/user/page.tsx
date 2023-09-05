"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef, useState } from 'react';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Pagination } from 'swiper/modules';

import './swiper.css';

const User = () => {
    return ( 
        <div className="w-full mt-8 flex items-center justify-center">
            <Card>
                <CardHeader className="flex flex-row">
                    <div>
                    <Swiper
                        effect={'cube'}
                        grabCursor={true}
                        cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                        }}
                        pagination={true}
                        modules={[EffectCube, Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                        </SwiperSlide>
                    </Swiper>
                    </div>
                    <div>
                        <CardTitle>Create project</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
 
export default User;