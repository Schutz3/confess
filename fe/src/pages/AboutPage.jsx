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
                    I made this app 'cause my FYP was full of stuff like this. It's pretty cool for my portfolio too, hehe.
                </p>

                <p className="text-lg mb-4">
                    So, with Confess you can:
                </p>

                <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Send secret messages via email or WhatsApp</li>
                    <li>Choose to send 10% if you're feeling unsure or 99.99% if you're confident (the 00.01% is in case there's no bug)</li>
                    <li>Say whatever you want without worrying about anyone knowing who you are</li>
                </ul>

                <p className="text-lg mb-4">
                    But remember, dude, even though Confess can make you anonymous, don't use it to bully or hurt others. I'll doxx you for real.
                </p>

                <div className="bg-warning text-warning-content p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-bold mb-2 flex items-center">
                        <AlertTriangle className="mr-2" /> Report Any Weird Stuff
                    </h2>
                    <p>
                        If you get a message that makes you uncomfortable or seems like abuse, just report it to:
                    </p>
                    <a href="mailto:report@scz.my.id" className="font-bold underline">report@scz.my.id</a>
                    <p className="mt-2">
                        Don't worry, I'll respond to all reports. (If I'm not too busy).
                    </p>
                </div>

                <p className="text-sm text-center">
                    Want the source code? Check it out <Link to="https://github.com/Schutz3" className="underline">here</Link>
                </p>
                <p className="text-sm text-center">
                    Wanna know who made this? Check it out <Link to="https://scz.my.id/" className="underline">here</Link>
                </p>
            </div>
        </div>
    );
};

export default AboutPage;