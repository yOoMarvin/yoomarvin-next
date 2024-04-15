import Image from 'next/image'

export default function Service(props) {
    return (
        <div className="flex w-full flex-col justify-between sm:flex-row-reverse sm:items-center">
            <Image
                src={props.src}
                alt={props.alt}
                className="mb-8 rounded-2xl shadow-xl sm:mb-0"
                width={160}
                height={160}
            />
            <div className="max-w-lg">
                <svg
                    className="mb-2 text-ui-neutral"
                    width="38"
                    height="30"
                    viewBox="0 0 38 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        opacity="0.3"
                        d="M7.92 29.52C5.57333 29.52 3.66667 28.7133 2.2 27.1C0.733333 25.4133 0 23.25 0 20.61C0 16.1367 1.35667 12.1033 4.07 8.51001C6.78333 4.84334 10.9633 2.09334 16.61 0.26001L17.93 3.45001C12.21 5.50334 8.94667 8.91334 8.14 13.68C10.4133 13.9 12.2467 14.7067 13.64 16.1C15.1067 17.4933 15.84 19.3267 15.84 21.6C15.84 23.9467 15.1067 25.8533 13.64 27.32C12.1733 28.7867 10.2667 29.52 7.92 29.52ZM27.72 29.52C25.3733 29.52 23.4667 28.7133 22 27.1C20.5333 25.4133 19.8 23.25 19.8 20.61C19.8 16.1367 21.1567 12.1033 23.87 8.51001C26.5833 4.84334 30.7633 2.09334 36.41 0.26001L37.73 3.45001C32.01 5.50334 28.7467 8.91334 27.94 13.68C30.2133 13.9 32.0467 14.7067 33.44 16.1C34.9067 17.4933 35.64 19.3267 35.64 21.6C35.64 23.9467 34.9067 25.8533 33.44 27.32C31.9733 28.7867 30.0667 29.52 27.72 29.52Z"
                        fill="#D5D3C6"
                    ></path>
                </svg>
                <div className="mb-4 flex flex-col space-y-2 text-lg text-onBackground-high">
                    {props.quote.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
                <div>
                    <p className="mb-0 text-sm font-medium uppercase tracking-wide text-onBackground-medium">
                        {props.name}
                    </p>
                    <p className="text-sm uppercase tracking-wide text-onBackground-medium">
                        {props.role}
                    </p>
                </div>
            </div>
        </div>
    )
}
