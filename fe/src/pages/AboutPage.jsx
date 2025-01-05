import { CircleHelp, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl pt-14 mt-10">
            <div className="bg-base-200 p-6 rounded-lg shadow-lg pt-14">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">Tentang Confess-In</h1>
                    <CircleHelp className="inline-block size-16 mb-4" />
                </div>
                <p className="text-lg mb-4">
                    Ini aplikasi gue bikin gara gara FYP gue isinya kek ginian. Mayan buat portofolio juga hehe
                </p>

                <p className="text-lg mb-4">
                    Nah, pake Confess ini lo bisa:
                </p>

                <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Ngirim pesan rahasia lewat email atau WhatsApp</li>
                    <li>Milih mau ngirim 10% buat yang masih ragu-ragu atau 99.99% buat yang PD (00.01% nya kalo gaada bug)</li>
                    <li>Ngomong apa aja tanpa takut ketauan sape lo</li>
                </ul>

                <p className="text-lg mb-4">
                    Tapi inget cok, meskipun Confess bisa bikin lo anonim, jangan sampe dipake buat bully orang atau 
                    nyakitin orang lain. Gue doxxing juga nih.
                </p>

                <div className="bg-warning text-warning-content p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-bold mb-2 flex items-center">
                        <AlertTriangle className="mr-2" /> Laporin Kalo Ada yang Aneh-Aneh
                    </h2>
                    <p>
                        Kalo lo dapet pesan yang bikin lo ga nyaman atau kayaknya abuse, langsung aja laporin ke:
                    </p>
                    <a href="mailto:report@scz.my.id" className="font-bold underline">report@scz.my.id</a>
                    <p className="mt-2">
                        Tenang aja, gue bakal nanggepin semua laporan. (kalo ga sibuk).
                    </p>
                </div>

                <p className="text-sm text-center">
                    Source code? Cek <Link to="https://github.com/Schutz3" className="underline">di sini</Link>
                </p>
                <p className="text-sm text-center">
                    Yang bikin? Cek <Link to="https://scz.my.id/" className="underline">di sini</Link>
                </p>
            </div>
        </div>
    );
};

export default AboutPage;