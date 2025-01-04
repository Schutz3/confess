import React from 'react'
import useMessageStore from '../store/useMessageStore'

const HomePage = () => {
    const { message, to, mode, isLoading, error, setMessage, setTo, setMode, sendMessage, clearError } = useMessageStore()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await sendMessage()
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl pt-14 mt-10">
            <div className="bg-base-200 p-6 rounded-lg shadow-lg  pt-14">
            <h1 className="text-4xl font-bold text-center mb-8">Confess to Someone</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Recipient Email or WhatsApp Phone Numer (Includes +)</span>
                    </label>
                    <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="Enter email or phone number"
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Message</span>
                    </label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message here"
                        className="textarea textarea-bordered h-24"
                    />
                </div>
                <div className="form-control mb-6">
                    <label className="label cursor-pointer">
                        <span className="label-text">Sending Mode: {mode ? 'YOLOOOOO' : 'Im scared :('}</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            checked={mode}
                            onChange={() => setMode(!mode)}
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
            {error && (
                <div className="alert alert-error mt-4">
                    <div className="flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                        </svg>
                        <label>{error}</label>
                    </div>
                    <div className="flex-none">
                        <button className="btn btn-sm btn-ghost" onClick={clearError}>Dismiss</button>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default HomePage