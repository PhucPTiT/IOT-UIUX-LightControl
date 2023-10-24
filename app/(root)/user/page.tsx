"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';
import './swiper.css';
import { useEffect, useState } from "react";
import Loading from "@/components/loading";

const User = () => {
    const [online, setOnline] = useState(true);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setOnline(window.navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);
    return ( 
            !online ?  <Loading/>
            :
            <div className="w-full mt-8 flex items-center justify-center">
                <Card className="bg-gray-100">
                    <CardHeader className="flex flex-row p-3">
                        <div className="mr-4 translate-y-6">
                            <Swiper
                                effect={'cube'}
                                grabCursor={true}
                                cubeEffect={{
                                    shadow: false,
                                }}
                                loop = {true}
                                autoplay = {{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                modules={[Autoplay, EffectCube, Pagination]}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <Image
                                        src="/logo.png"
                                        alt=""
                                        width={100}
                                        height={100}
                                        loading="lazy"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                <Image
                                    src="/macgai.jpg"
                                    alt=""
                                    width={100}
                                    height={100}
                                    loading="lazy"
                                />
                                </SwiperSlide>
                            </Swiper>
                            
                        </div>
                        <div>
                            <CardTitle className="text-blue-600">Học Viện</CardTitle>
                            <CardDescription>Công nghệ Bưu chính Viễn thông</CardDescription>
                            <div className="bg-red-400 w-full h-[2px] mt-1 rounded"></div>
                            <div className="text-center text-red-500 font-semibold mt-1">THẺ SINH VIÊN</div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-3 py-0 flex flex-row items-center gap-6 relative">
                        <div>
                            <p className="text-sm font-bold text-blue-800 mt-1 text-center">Mã SV</p>
                            <p className="text-sm font-semibold text-red-500">B20DCCN511</p>
                        </div>
                        <div className="translate-y-[-20px]">
                            <p>
                                <span className="text-xs font-bold">Họ và tên: </span>
                                <span className="text-xs text-blue-800 font-bold">Nguyễn Đoàn Đức Phúc</span>
                            </p>
                            <p>
                                <span className="text-xs font-bold">Sinh ngày: </span>
                                <span className="text-xs text-blue-800 font-bold">18/08/2002</span>
                            </p>
                            <p>
                                <span className="text-xs font-bold">Hộ khẩu TT: </span>
                                <span className="text-xs text-blue-800 font-bold">Thái Bình</span>
                            </p>
                            <p>
                                <span className="text-xs font-bold">Ngành: </span>
                                <span className="text-xs text-blue-800 font-bold">Công nghệ thông tin</span>
                            </p>
                        </div>
                        <Image src="/logo.png" alt="" width={200} height={200} className="absolute opacity-40 top-[-50px] right-[20px]"/>
                    </CardContent>
                </Card>
            </div>
    );
}
 
export default User;