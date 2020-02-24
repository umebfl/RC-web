export default payload => (
    <div {...payload} style={{display: 'flex', userSelect: 'none', ...payload.style}}>
        {payload.children}
    </div>
)
