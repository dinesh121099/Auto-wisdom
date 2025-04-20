"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import Link from "next/link";


export default function Home() {
    const [data, setData] = useState(null);
    const endpoint = "/api/data";
    const token = localStorage.getItem('token') || "Unknown Authorization";

    function api_Call(endpoint) {
        axios
            .get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => setData(res.data))
            .catch(err => console.error(err))
    }
    useEffect(() => {
        api_Call(endpoint);
    }, []);

    // useEffect(()=> {
    //     console.log(data);
    // }, [data]);
    if (!data) return <p className="text-center mt-8">Loading...</p>;
    
    return (
        <div className="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {data.map(ele => (
                <Link key={ele.variant_code} href={`/${ele.brand}-${ele.variant_code}`}>
                <Card key={ele.variant_code} className="w-auto cursor-pointer hover:shadow-lg transition">
                    <CardHeader>
                        <CardTitle>{ele.brand} {ele.model}</CardTitle>
                        <CardDescription>{ele.variant_code}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid2 gap-4">
                        <img src={ele.images[0]} alt={`${ele.variant_code} image`} width={300} height={400} />
                        <div className="flex justify-between items-center">
                            {Object.entries(ele.colors).map(([clrname, clr]) => (
                                <div key={clrname} className="flex flex-col items-center">
                                    <span
                                        className="w-5 h-5 rounded-full border border-gray-400"
                                        style={{ backgroundColor: clr }}
                                        title={clrname}
                                    />
                                    <p className="text-xs mt-1 text-center">{clrname}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <div className="text-gray-700">
                            Rs. <span className="text-gray-500">{ele.price}</span> /.
                        </div>
                    </CardFooter>
                </Card>
                </Link>
            ))}
        </div>
    );
}