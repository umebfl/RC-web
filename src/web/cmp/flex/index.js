export default payload => (
    <div {...payload} style={{display: 'flex', ...payload.style}}>
        {payload.children}
    </div>
)
