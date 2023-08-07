import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reviewCampaign } from "../store/reducer";
import { ExpiredCampaign } from "../store/reducer";
import { useState } from "react";

const NewCampaign = ({ newDate }) => {
  
  const dispatch = useDispatch();
  //console.log(likes);
  // const review = useSelector((state) => state.Campaign.review);

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 9; 

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = newDate.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(currentItems)

 
  newDate.sort((a, b) => b.date - a.date);
  return (
    <div className="section py-5">
      <div className="btn-block text-center mb-5">
        <h1>Education Campaigns</h1>
        {/* <p>Recent Campaigns</p> */}
      </div>
      <div className="container">
        <div className="row">
          {/* <div className=""></div> */}
          {newDate.map((item, index) => {
            if (item && item?.category == "Education") {
              return (
                <div className="col-md-4" key={index}>
                  <div className="card campaigns mb-3 shadow-sm fixed-height-card">
                    <Link
                      to="/donation"
                      style={{ TextDecoder: "none", color: "#000" }}
                      onClick={() => {
                        dispatch(reviewCampaign(item));
                      }}
                    >
                      <div className="p-relative">
                        <img
                          className="card-img-top fixed-height-image"
                          src={item?.newImage}
                          alt="Test"
                        />
                      </div>
                      <div className="card-body">
                        <small className="btn-block mb-1">
                          <div className="text-muted">
                            <i className="far fa-folder-open"></i>{" "}
                            {item.category}
                          </div>
                        </small>
                        <h5 className="card-title text-truncate">
                          <div className="text-dark">{item.campaignName}</div>
                        </h5>
                        <div className="progress progress-xs mb-4">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: "0.00%" }}
                          ></div>
                        </div>
                        <p className="card-text text-truncate">
                          {item?.description}
                        </p>
                        {/* <div className="d-flex justify-content-between align-items-center">
                      <strong>$0</strong>
                      <small className="font-weight-bold">0.00%</small>
                    </div> */}
                        {/* <small className="text-muted">raised of $5,000</small> */}
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-truncate">
                            <img
                              src={item.profile?.profileImageURL}
                              width="25"
                              height="25"
                              className="rounded-circle avatar-campaign"
                            />
                            <small>
                              by <strong>{item?.email}</strong>
                            </small>
                          </span>

                          <small className="text-truncate">
                            <i className="fa fa-infinity text-success"></i>{" "}
                            {`Deadline: ${item.daysRemaining > 0 ? item.daysRemaining:0} days`}
                          </small>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            } else {
              <div>
                <h3>No campaign</h3>
              </div>;
            }
          })}
        </div>
      </div>
      {/* <div className="btn-block text-center py-3">
        <a 
        href="" 
        className="btn btn-primary btn-main p-2 px-5 btn-lg rounded"
        onClick={() => setCurrentPage(currentPage + 1)}>
          View all{" "}
          <small className="pl-1">
            <i className="fa fa-long-arrow-alt-right"></i>
          </small>
        </a>
      </div> */}
    </div>
  );
};

export default NewCampaign;
