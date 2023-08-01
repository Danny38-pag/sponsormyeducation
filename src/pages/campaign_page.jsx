import Nav from "../navbar/navbar"
import Navbar from "../navbar"
import JumbotronBackground from "../sections/jumbotron"
import CampaignForm from "../reusable-components/register_campaign"
import Footer from "../footer"

function CampaignPage() {
  return (
    <div>
        <Navbar />
        <Nav />
        <JumbotronBackground />
        <CampaignForm/>
        <Footer />
    </div>
  )
}

export default CampaignPage