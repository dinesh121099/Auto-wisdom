"use client"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function SlugPage() {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [imgInd, setimgInd] = useState(0);
    const endpoint = "/api/data";

    function api_Call(endpoint) {
        axios
            .get(endpoint)
            .then(res => {
                const var_code = slug.split('-').slice(1).join('-');
                const [filteredData] = res.data.filter((ele) => ele.variant_code == var_code);
                setData(filteredData);
            })
            .catch(err => console.error(err))
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
        <div className="my-7 mx-70">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center font-bold text-xl">{data.brand} {data.model}</CardTitle>
                    <CardDescription className="text-center">{data.variant_code}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center">
                        <img src={data.images[imgInd]} width={400} height={500} />
                        <div className="flex justify-center items-center">
                            {Object.entries(data.colors)
                                .map(([clrname, clr], index) => (
                                    <div key={clrname}
                                        className="w-20 flex flex-col items-center cursor-pointer"
                                        onClick={() => setimgInd(index)}>
                                        <span
                                            className="w-5 h-5 rounded-full border border-gray-400 hover:shadow-xl transition"
                                            style={{ backgroundColor: clr }}
                                            title={clrname}
                                        />
                                        <p className="text-xs mt-1 text-center hover:shadow-xl">{clrname}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex flex-col text-sm text-gray-700 ml-15">
                        <span> Model Year : {data.year}</span>
                        <span> {data.variant_type.charAt(0).toUpperCase() + data.variant_type.slice(1)} Variant</span>
                        <span> {data.engine_type}</span>
                        <span> {data.emission_norm} </span>
                        <span> {data.mileage} Kmpl avg.</span>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                    <Tabs defaultValue="Features" className="w-5/6 p-4 border">
                        <TabsList>
                            <TabsTrigger value="Features">Features</TabsTrigger>
                            <TabsTrigger value="Specifications">Specifications</TabsTrigger>
                            <TabsTrigger value="Dimensions">Dimensions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Features" className="h-10">
                            <Tabs defaultValue={Object.keys(features)[0]} className="flex flex-row m-2 h-full">
                                <TabsList className="flex flex-col py-2 h-full">
                                    {Object.entries(features).map(([category,feature]) => (
                                        <TabsTrigger key={category} value={category} className="w-full text-sm font-normal ">{category}</TabsTrigger>
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
                            <Tabs defaultValue="Engine" className="flex flex-row m-2 h-30">
                                <TabsList className="flex flex-col py-2 h-full">
                                    <TabsTrigger value="Engine" className="w-full">Engine specs</TabsTrigger>
                                    <TabsTrigger value="Transmission" className="w-full">Transmission</TabsTrigger>
                                    <TabsTrigger value="Fuel" className="w-full"> Fuel specs </TabsTrigger>
                                    <TabsTrigger value="Speed" className="w-full"> Speed specs </TabsTrigger>
                                </TabsList>
                                <div className="flex items-center pl-6">
                                    <TabsContent value="Engine" className="flex flex-col text-sm text-gray-700">
                                        <span>Horse Power : {data.carSpecifications.horsepower} hp</span>
                                        <span>Torque : {data.carSpecifications.torque} N/m</span>
                                        <span>No. of Cylinders : {data.carSpecifications.cylinders}</span>
                                        <span>Engine Displacement : {data.carSpecifications.engine_displacement} CC</span>
                                        <span>Valves / Cylinder : {data.carSpecifications.valves_per_cylinder}</span>
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
                        <TabsContent value="Dimensions" className="flex flex-col text-sm text-gray-700 ml-10">
                            <span>Length : {data.carDimensions.length} mm</span>
                            <span>Width : {data.carDimensions.width} mm</span>
                            <span>Height : {data.carDimensions.height} mm</span>
                            <span>Wheel Base : {data.carDimensions.wheel_base} mm</span>
                            <span>Ground Clearance : {data.carDimensions.ground_clearance} mm</span>
                            <span>Curb-Weight : {data.carDimensions.curb_weight} mm</span>
                        </TabsContent>
                    </Tabs>
                </CardFooter>
            </Card>
        </div>
    );
}
