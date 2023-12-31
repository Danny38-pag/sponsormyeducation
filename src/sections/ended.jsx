import { useDispatch, useSelector } from "react-redux";
import { reviewCampaign } from "../store/reducer";
import { Link } from "react-router-dom";

function Ended() {
  const data = useSelector((state) => state.Campaign.data);
  const user = useSelector((state) => state.Campaign.user);
  const dispatch = useDispatch();

  return (
    <div className="section py-5">
      <div className="btn-block text-center mb-5">
        <h1>Ended Campaigns</h1>
      </div>
      <div className="container">
        <div className="row">
          {data.map((item, index) => {
            if (item && item?.daysRemaining <= 0) {
              const to = user ? "/donation" : "/login"
              return (
                <div className="col-md-4" key={index}>
                  <div className="card campaigns mb-3 shadow-sm fixed-height-card">
                    <Link
                      to={to}
                      style={{ TextDecoder: "none", color: "#000" }}
                      onClick={() => {
                        
                        user && dispatch(reviewCampaign(item));
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
                          <div className="text-dark">Test</div>
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
                              src="https://fundmescript.com/public/avatar/default.jpg"
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
                            {`Deadline: ${
                              item.daysRemaining > 0 ? item.daysRemaining : 0
                            } days`}
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
    </div>
  );
}

export default Ended;
