import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filteredItem } from "../store/reducer";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { usePaystackPayment } from "react-paystack";
import PaystackPop from "@paystack/inline-js";
import "firebase/firestore";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import ProfileDashboard from "./profileDashboard";

function Profile() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);
  const [boostedCampaign, setBoostedCampaign] = useState(null);

  const data = useSelector((state) => state.Campaign.data);

  const user = useSelector((state) => state.Campaign.user);

  const boosted = useSelector((state) => state.Campaign.boosted);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const filterCampaign = data.find((item) => item.id == boosted);
    if (filterCampaign) {
      setBoostedCampaign(filterCampaign);
    }
  }, [boosted, data]);

  const handlePay = async (event) => {
    event.preventDefault();
    const paystack = new PaystackPop();
    paystack.newTransaction({
      // key: "pk_live_e286893e885cd92c8d302bd811d9e23e6ef14642",
      key: "pk_test_2cff05b0b363519ca965a0e558e9ee767bcea1fd",
      amount: amount * 100,
      Phone: phone,
      email: email,
      async onSuccess(transaction) {
        let message = `Payment Complete! Reference ${transaction.reference}`;
        //  setDoc(doc(db, "donate", donateData.id), donateData);

        if (boostedCampaign) {
          try {
            await updateDoc(doc(db, "Campaign", boostedCampaign.id), {
              boosted: true,
            });

            alert("Campaign successfully boosted!");
          } catch (error) {
            console.error("Error updating document: ", error);
            alert("An error occurred while boosting the campaign.");
          }
        } else {
          console.error("Boosted campaign not found!");
        }
        alert(message);
      },
      onCancel() {
        alert("You have Canceled the transaction");
      },
    });

    setAmount("");
    setPhone("");
    setEmail("");
  };

  return (
    <>
      {/* profile page */}
      <div className="container-fluid mt-5 ">
        <div className="row">
          <ProfileDashboard />
          {data.map((item, index) => {
            if (item && item.email === user) {
              dispatch(filteredItem(item));
              const percentage = (item.donations / item.amount) * 100;
              return (
                <div className="col-4 " key={index}>
                  <div className="card campaigns mb-3 shadow-sm fixed-height-card">
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
                          <i className="far fa-folder-open"></i> {item.category}
                        </div>
                      </small>
                      <h5 className="card-title text-truncate">
                        <div className="text-dark">{item.campaignName}</div>
                      </h5>
                      <div className="progress progress-xs mb-4">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: `${percentage.toFixed(2)}%` }}
                        ></div>
                      </div>
                      <p className="card-text text-truncate">
                        {item?.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <strong>₵{item.donations}</strong>
                        <small className="font-weight-bold">
                          {percentage}%
                        </small>
                      </div>
                      <small className="text-muted">
                        ₵{item.donations} raised of ₵{item.amount}
                      </small>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-truncate">
                          <img
                            src={item.profile.profileImageURL}
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
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Boost</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="name@example.com"
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                              type="number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="000 000 000"
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              placeholder="10"
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handlePay}>
                          Boost
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <div className="btn-block text-center py-3">
                      <button
                        onClick={handleShow}
                        className="btn btn-primary btn-main p-2 px-5 btn-lg rounded"
                      >
                        Boost your Campaign{" "}
                        <small className="pl-1">
                          <i className="fa fa-long-arrow-alt-right"></i>
                        </small>
                      </button>
                    </div>
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
    </>
  );
}

export default Profile;
