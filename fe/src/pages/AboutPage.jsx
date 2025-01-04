import { CircleHelp, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl pt-14 mt-10">
            <div className="bg-base-200 p-6 rounded-lg shadow-lg pt-14">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">About Confess-In</h1>
                    <CircleHelp className="inline-block size-16 mb-4" />
                </div>
                <p className="text-lg mb-4">
                    Confess is an anonymous messaging that allows you to send messages without revealing your identity. 
                    It's designed for those times when you want to express yourself freely without the constraints of personal identification.
                </p>

                <p className="text-lg mb-4">
                    With Confess, you can:
                </p>

                <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Send anonymous messages via email or WhatsApp</li>
                    <li>Choose between 10% (Im scared) or 100% (YOLOOOOO) sending ratio</li>
                    <li>Express yourself without fear of judgment</li>
                    <li>Reach out to someone you've been hesitant to contact</li>
                </ul>

                <p className="text-lg mb-4">
                    While Confess provides a platform for anonymous communication, we strongly encourage responsible use. 
                    This service is not intended for harassment, bullying, or any form of abusive behavior.
                </p>

                <div className="bg-warning text-warning-content p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-bold mb-2 flex items-center">
                        <AlertTriangle className="mr-2" /> Report Abuse
                    </h2>
                    <p>
                        If you receive any message that you consider abusive or inappropriate, please report it to us immediately at:
                    </p>
                    <a href="mailto:report@scz.my.id" className="font-bold underline">report@scz.my.id</a>
                    <p className="mt-2">
                        We take all reports seriously and will investigate each case to maintain a safe environment for all users.
                    </p>
                </div>

                <p className="text-sm text-center">
                    About the <Link to="https://github.com/Schutz3" className="underline">developer</Link>
                </p>
            </div>
        </div>
    );
};

export default AboutPage;