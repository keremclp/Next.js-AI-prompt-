import '@styles/global.css' 
import Nav from '@components/Nav'
import Provider from '@components/Provider'
export const metada = {
    title: 'Promptpulse',
    description: 'Promptpulse is a web app that helps you to keep track of your AI prompts',
}
const RootLayout = ( {children} ) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
            
        </body>
    </html>
  )
}

export default RootLayout;