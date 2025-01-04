import React from 'react'
import useMessageStore from '../store/useMessageStore'
import { CircleOff, X, Loader2 } from 'lucide-react'

const HomePage = () => {
    const { message, to, mode, isLoading, error, setMessage, setTo, setMode, sendMessage, clearError } = useMessageStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await sendMessage()
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl pt-14 mt-10">
            <div className="bg-base-200 p-6 rounded-lg shadow-lg  pt-14">
                <h1 className="text-4xl font-bold text-center mb-8">Confess-In</h1>
                {error && (
                    <div className="alert alert-error mt-4 relative">
                        <div className="flex items-center">
                            <CircleOff size={24} className="text-red-600 mr-2" />
                            <label>{error}</label>
                        </div>
                        <button
                            className="btn btn-sm btn-ghost absolute top-0 right-0 mt-1 mr-1"
                            onClick={clearError}
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Email / No WA penerima (Make +62 / +countryCode)</span>
                        </label>
                        <input
                            type="text"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            placeholder="crush@scz.my.id / +62857xxxxxxx"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Isi pesan</span>
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Balikan yuk?"
                            className="textarea textarea-bordered h-24"
                        />
                    </div>
                    <div className="form-control mb-6">
                        <label className="label cursor-pointer">
                            <span className="label-text tooltip tooltip-right" data-tip="Yoloo 100% chance pesan lo kekirim, Mamah aku takut 10% chance pesan lo kekirim">
                                Mode: {mode ? 'YOLOOOOOO' : 'Mamahhh aku takuttt :(('}
                            </span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={mode}
                                onChange={() => setMode(!mode)}
                            />
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Mengirim
                            </>
                        ) : (
                            "Kirim"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default HomePage