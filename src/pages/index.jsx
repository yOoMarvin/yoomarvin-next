import Header from '../components/Header'

export default function Home() {
    return (
        <div className="mx-auto flex max-w-screen-xl flex-col items-center">
            <Header />
            <h1 className=" mt-8 text-center text-2xl font-bold">
                Hi, my name is Marvin 👋
            </h1>
        </div>
    )
}
