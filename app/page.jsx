import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col space-y-5">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center"> AI-Powred Prompts</span>
      </h1>
      <p className="desc text-center">
      Promptpulse is a web app that helps you to discover,create and share creative AI prompts
      
      </p>

      <Feed />

        
    </section>
  )
}

export default Home