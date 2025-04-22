"use client"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Calendar, Settings, Gauge, Leaf, Fuel, Speedometer } from "lucide-react"

export default function SlugPage() {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [imgInd, setimgInd] = useState(0);
    const [prevInd, SetprevInd] = useState(0);
    const router = useRouter();
    const endpoint = "/api/data";

    function api_Call(endpoint) {
        if (typeof window === 'undefined') return;
        const token = localStorage.getItem('token');
        axios
            .get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                const var_code = slug.split('-').slice(1).join('-');
                const [filteredData] = res.data.filter((ele) => ele.variant_code == var_code);
                setData(filteredData);
            })
            .catch(err => {
                toast.error(err.response.data.error);
                toast.info('Redirecting: Try loging in again');
                router.push('/');
            })
    }
    useEffect(() => {
        api_Call(endpoint);
    }, []);

    const [features, setFeatures] = useState(null);

    useEffect(() => {
        const groupedFeatures = {};
        data?.carFeatures.forEach(({ name, value, category }) => {
            if (value === "Yes") {
                if (!groupedFeatures[category]) {
                    groupedFeatures[category] = [];
                }
                groupedFeatures[category].push(name);
            }
        });
        setFeatures(groupedFeatures);
    }, [data]);

    // useEffect(()=> {
    //     console.log(Object.keys(features)[0]);
    // },[features])

    if (!data) return <p className="text-center mt-8">Loading...</p>;

    return (
        <Card className="w-full max-w-[95vw] max-[480px]:max-w-5xl mx-auto my-4 p-4 max-[480px]:p-6 lg:w-2/4 overflow-x-auto">
            <CardHeader>
                <CardTitle className="text-center font-bold text-xl">{data.brand} {data.model}</CardTitle>
                <CardDescription className="text-center">{data.variant_code}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center">
                    <img src={data.images[imgInd]}
                        className="w-full max-w-md h-auto object-contain"
                        alt={`${data.brand} ${data.model}`} />
                    <div className="flex justify-center items-center flex-wrap gap-4">
                        {Object.entries(data.colors)
                            .map(([clrname, clr], index) => (
                                <div key={clrname}
                                    className="w-16 flex flex-col items-center cursor-pointer"
                                    onClick={() => {
                                        setimgInd(index)
                                        SetprevInd(index)
                                    }
                                    }
                                    onMouseEnter={() => setimgInd(index)}
                                    onMouseLeave={() => setimgInd(prevInd)}>
                                    <span
                                        className="w-5 h-5 rounded-full p-2
                                            border border-gray-400
                                            transition duration-300 ease-in-out
                                            transform hover:-translate-y-2
                                            hover:shadow-lg"
                                        style={{ backgroundColor: clr }}
                                        title={clrname}
                                    />
                                    <p className="text-xs mt-1 text-center hover:shadow-xl">{clrname}</p>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 max-[480px]:grid-cols-1 gap-y-1 text-sm text-gray-700 ml-4 sm:ml-10 mt-4">
                    <span className="flex items-center gap-2 font-semibold">
                        <Calendar className="w-4 h-4" /> Model Year:
                        <span>{data.year}</span>
                    </span>
                    <span className="flex items-center gap-2 font-semibold">
                        <Settings className="w-4 h-4" /> Variant:
                        <span>{data.variant_type.charAt(0).toUpperCase() + data.variant_type.slice(1)} Variant</span>
                    </span>
                    <span className="flex items-center gap-2 font-semibold">
                        <Gauge className="w-4 h-4" /> Engine Type:
                        <span>{data.engine_type}</span>
                    </span>
                    <span className="flex items-center gap-2 font-semibold">
                        <Leaf className="w-4 h-4" /> Emission Norm:
                        <span>{data.emission_norm}</span>
                    </span>
                    <span className="flex items-center gap-2 font-semibold">
                        <Fuel className="w-4 h-4" /> Mileage:
                        <span>{data.mileage} Kmpl avg.</span>
                    </span>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center">
                <Tabs defaultValue="Specifications" className="w-full max-w-5xl px-2 sm:px-8 py-4 border mx-auto flex items-center justify-center">
                    <TabsList className="flex flex-col min-[480px]:flex-row h-full py-2">
                        <TabsTrigger value="Features" className="w-full">Features</TabsTrigger>
                        <TabsTrigger value="Specifications" className="w-full">Specifications</TabsTrigger>
                        <TabsTrigger value="Dimensions" className="w-full">Dimensions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Features" className="h-10">
                        <Tabs defaultValue={Object.keys(features)[0]} className="flex flex-col m-2 h-full min-[480px]:flex-row justify-center items-center">
                            <TabsList className="flex flex-col py-2 h-full w-32 gap-1 px-0 py-0">
                                {Object.entries(features).map(([category, feature]) => (
                                    <TabsTrigger key={category} value={category} className="w-full text-[10px] font-bold ">{category}</TabsTrigger>
                                ))}
                            </TabsList>
                            <div className="flex items-center pl-6">
                                {Object.entries(features).map(([category, features]) => (
                                    <TabsContent key={category} value={category} className="flex flex-col text-sm font-thin text-gray-700">
                                        <ul className="list-disc pl-5">
                                            {features.map((feature, idx) => (
                                                <li key={idx}>{feature}</li>
                                            ))}
                                        </ul>
                                    </TabsContent>
                                ))}
                            </div>
                        </Tabs>
                    </TabsContent>
                    <TabsContent value="Specifications">
                        <Tabs defaultValue="Engine" className="flex flex-col min-[480px]:flex-row gap-4 m-2 items-center">
                            <TabsList className="flex flex-col py-2 h-full w-32 gap-1 px-0 py-0">
                                <TabsTrigger value="Engine" className="w-full text-[10px] font-bold">Engine specs</TabsTrigger>
                                <TabsTrigger value="Transmission" className="w-full text-[10px] font-bold">Transmission</TabsTrigger>
                                <TabsTrigger value="Fuel" className="w-full text-[10px] font-bold"> Fuel specs </TabsTrigger>
                                <TabsTrigger value="Speed" className="w-full text-[10px] font-bold"> Speed specs </TabsTrigger>
                            </TabsList>
                            <div className="flex items-center pl-6">
                                <TabsContent value="Engine" className="flex flex-col text-sm text-gray-700">
                                    <span>Horse Power : <span>{data.carSpecifications.horsepower} hp</span></span>
                                    <span>Torque : <span>{data.carSpecifications.torque} N/m</span></span>
                                    <span>No. of Cylinders : <span>{data.carSpecifications.cylinders}</span></span>
                                    <span>Engine Displacement : <span>{data.carSpecifications.engine_displacement} CC</span></span>
                                    <span>Valves / Cylinder : <span>{data.carSpecifications.valves_per_cylinder}</span></span>
                                </TabsContent>
                                <TabsContent value="Transmission" className="flex flex-col text-sm text-gray-700">
                                    <span>Transmission-type: {data.carSpecifications.transmission_type}</span>
                                    <span>Drive Train: {data.carSpecifications.drive_train}</span>
                                </TabsContent>
                                <TabsContent value="Fuel" className="flex flex-col text-sm text-gray-700">
                                    <span>Tank Capacity : {data.carSpecifications.tank_capacity} L</span>
                                    <span>Fuel Efficiency (City) : {data.carSpecifications.fuel_efficiency_city} Kmpl</span>
                                    <span>Fuel Efficiency (Highway) : {data.carSpecifications.fuel_efficiency_highway} Kmpl</span>
                                </TabsContent>
                                <TabsContent value="Speed" className="flex flex-col text-sm text-gray-700">
                                    <span>Top-Speed : {data.carSpecifications.top_speed} Kmph</span>
                                    <span>acceleration of 0 to 100 in : {data.carSpecifications.acceleration_0_100_kmph} S</span>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </TabsContent>
                    <TabsContent value="Dimensions" className="grid grid-cols-2 gap-y-1 gap-x-4 text-sm ml-4">
                        <span className="font-bold text-[12px]">Length:</span>
                        <span>{data.carDimensions.length} mm</span>

                        <span className="font-bold text-[12px]">Width:</span>
                        <span>{data.carDimensions.width} mm</span>

                        <span className="font-bold text-[12px]">Height:</span>
                        <span>{data.carDimensions.height} mm</span>

                        <span className="font-bold text-[12px]">Wheel Base:</span>
                        <span>{data.carDimensions.wheel_base} mm</span>

                        <span className="font-bold text-[12px]">Ground Clearance:</span>
                        <span>{data.carDimensions.ground_clearance} mm</span>

                        <span className="font-bold text-[12px]">Curb-Weight:</span>
                        <span>{data.carDimensions.curb_weight} mm</span>
                    </TabsContent>
                </Tabs>
            </CardFooter>
        </Card>
    );
}
