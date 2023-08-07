import Navigation from "../navbar/Navigation"
import JumbotronBackground from "../sections/jumbotron"
import PopularContent from "../sections/popular_page_content"
import Footer from "../footer"


function PopularPage({newDate}) {
  return (
    <div>
      
        <Navigation />
        <JumbotronBackground />
        <PopularContent newDate={newDate}/>
        <Footer />
    </div>
  )
}

export default PopularPage