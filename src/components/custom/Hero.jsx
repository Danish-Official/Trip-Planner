/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import bgvideo from "/bgvideo.mp4";
import { Button } from "../ui/button";
const Hero = () => {
    return (
        <>
            <div>
                <div className="w-full h-screen left-0 top-0 absolute">
                    <div className="w-full h-full absolute bg-black opacity-50" />
                    <div className="w-full h-full absolute top-0 flex flex-col justify-center items-center text-center text-white z-10">
                        <h1 className="text-5xl">Discover Your Next Adventure With VoyageVista</h1>
                        <p>
                            From hidden gems to iconic landmarks, VoyageVista turns your
                            travel dreams into unforgettable adventures. Let’s create memories
                            together!
                        </p>
                        <div>
                            <Link to={"/create-trip"} className="text-white">
                                <Button
                                    className="mt-10"
                                >
                                    Get Started, It's Free
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <video
                        src={bgvideo}
                        className="h-full w-full object-cover"
                        autoPlay
                        loop
                        muted
                    />
                </div>
                <div className="mt-[calc(100vh)] p-4">
                    <img src="/screen.jpg" alt="" className="w-[50%] mx-auto" />
                </div>
            </div>
        </>
    );
};

export default Hero;
