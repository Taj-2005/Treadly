import Button from "../Button/Button";

export default function ContactForm() {
    return (
        <div className="min-h-screen bg-[#FBF6EF] text-[#2E2C2A] px-6 md:px-12 py-16">
            <h1 className="text-4xl md:text-5xl font-extrabold font-archivo mb-4 text-center">Get in Touch</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-xl font-semibold">
                Have questions, feedback, or partnership ideas? We'd love to hear from you!
            </p>

            <form className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6">
                <div>
                <label className="block mb-2 text-sm font-semibold">Name</label>
                <input
                    type="text"
                    placeholder="Your name"
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E2C2A]"
                />
                </div>

                <div>
                <label className="block mb-2 text-sm font-semibold">Email</label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E2C2A]"
                />
                </div>

                <div>
                <label className="block mb-2 text-sm font-semibold">Message</label>
                <textarea
                    rows="5"
                    placeholder="Write your message..."
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E2C2A]"
                ></textarea>
                </div>
                <div className="flex flex-row justify-center align-center">
                    <Button text="Send Message"/>
                </div>
            </form>
        </div>
    )
}