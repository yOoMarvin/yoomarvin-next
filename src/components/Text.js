export default function Text({ text }) {
    if (!text) {
        return null
    }
    return text.map((value) => {
        const {
            annotations: { bold, code, italic, strikethrough, underline },
            text,
        } = value
        return (
            <span
                className={[
                    bold ? 'font-bold' : '',
                    italic ? 'italic' : '',
                    strikethrough ? 'line-through' : '',
                    underline ? 'underline' : '',
                ].join(' ')}
            >
                {text.link ? (
                    <a href={text.link.url} className="link-blog">
                        {text.content}
                    </a>
                ) : (
                    text.content
                )}
            </span>
        )
    })
}
