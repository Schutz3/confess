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
                    Bro, Confess itu aplikasi buat ngirim pesan anonim. Jadi lo bisa ngomong apa aja tanpa ketahuan siapa lo. 
                    Cocok banget buat lo yang pengen ngungkapin sesuatu tapi malu-malu kucing.
                </p>

                <p className="text-lg mb-4">
                    Nah, pake Confess lo bisa:
                </p>

                <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Ngirim pesan rahasia lewat email atau WhatsApp</li>
                    <li>Milih mau ngirim 10% (buat yang masih ragu-ragu) atau 100% (buat yang nekat abis)</li>
                    <li>Ngomong apa aja tanpa takut diomongin orang</li>
                    <li>Nyamperin orang yang selama ini lo taksir diem-diem</li>
                </ul>

                <p className="text-lg mb-4">
                    Tapi inget ya bro, meskipun Confess bisa bikin lo anonim, jangan sampe dipake buat nge-bully atau 
                    nyakitin orang lain. Kita mah pengennya damai-damai aja.
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
                        Tenang aja, kita bakal nanggepin semua laporan dengan serius. (kalo ga sibuk) Biar Confess tetep aman dan nyaman buat semua orang.
                    </p>
                </div>

                <p className="text-sm text-center">
                    Penasaran sama source code? Cek aja <Link to="https://github.com/Schutz3" className="underline">di sini</Link>
                </p>
            </div>
        </div>
    );
};

export default AboutPage;