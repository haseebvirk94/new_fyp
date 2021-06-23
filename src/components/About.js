import React, { Component } from "react";

import NavBar from "./NavBar";
import img1 from "../style/images/about/about-2.jpg";
class About extends Component {
  render() {
    return (
      <div>
        <NavBar></NavBar>

        <section id="about-page" class="pt-70 pb-110">
          <div class="container">
            <div class="row">
              <div class="col-lg-5">
                <div class="section-title mt-50">
                  <h5>About us</h5>
                  <h2>Welcome to AAS </h2>
                </div>
                <div class="about-cont">
                  <p>
                    The Adaptive Assessment System (AAS) is an inviting and
                    engaging web-platform for preparation of exams. AAS will
                    evaluate a student based on the sections of various courses
                    that they take. The sections consist of various concepts.
                    Rather than taking the traditional approach of teaching the
                    same materials to all enrolled students, students will be
                    allowed to take the sections and concepts of those
                    particular courses by their own choice hence making the
                    system adaptive i.e. it will have different courses,
                    sections, and concepts for each student. The system will
                    record the progress of each student and will inform them
                    about their strength in particular concepts and will not let
                    them move to another set of concepts (a section) until and
                    unless they achieve the requisite progress. Progress will be
                    calculated on a cumulative basis i.e. a student cannot jump
                    to the next set of concepts before having enough
                    understanding of the previous one. The system will ensure
                    that each student spend a good amount of time on a single
                    set of concepts to ensure that they grasp it thoroughly. The
                    approach taken by our system ensures that the student can
                    assess themselves at any stage and be sure about themselves.
                    The system will inform the students about their weak and
                    strong concepts. The adaptive nature of the system makes the
                    learning experience specialized for each student by allowing
                    them to focus more on their weak concepts.
                  </p>
                </div>
              </div>
              <div class="col-lg-7">
                <div class="about-image mt-50">
                  <img src={img1} alt="About" />
                </div>
              </div>
            </div>
            <div class="about-items pt-60" style={{ marginTop: "100px" }}>
              <div class="row justify-content-center">
                <div class="col-lg-4 col-md-6 col-sm-10">
                  <div class="about-singel-items mt-30">
                    <span>01</span>
                    <h4>Why Choose us</h4>
                    <p>Adaptive Student Plans</p>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-10">
                  <div class="about-singel-items mt-30">
                    <span>02</span>
                    <h4>Our Mission</h4>
                    <p>Best Online learning system</p>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-10">
                  <div class="about-singel-items mt-30">
                    <span>03</span>
                    <h4>Our vission</h4>
                    <p>To spread knowledge to backward areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default About;
