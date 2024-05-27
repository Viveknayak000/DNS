// import myImage from './dns-servers.png'
import { Credentails } from "./Credentials";

export function Home() {
    return (
        <div className=" font-sans">
           

            <div className="lg:h-3/5  bg-white-200">
                <div>
                    <div className="flex flex-col lg:h-screen justify-center items-center">
                        <Credentails />
                    </div>
                </div>
            </div>
        </div>
    );
}