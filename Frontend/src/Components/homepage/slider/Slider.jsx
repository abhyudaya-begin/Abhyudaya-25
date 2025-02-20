import React, { useEffect, useState } from "react";
import "./slider.css";
import Card from "./Card";
import asb from "../../../assets/ASB.jpg";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlideInterval, setAutoSlideInterval] = useState(null);

  const slides = [
    { url: asb, name: "ANUBHAV SINGH BASSI" },
    { url: asb, name: "Image 2" },
    { url: asb, name: "Image 3" },
    { url: asb, name: "Image 4" },
    
    
  ];

  useEffect(() => {
    const track = document.getElementById("image-track");

    const handleMouseDown = (e) => {
      track.dataset.mouseDownAt = e.clientX;
      track.dataset.isDragging = "true";
    };

    const handleMouseUp = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage;
      track.dataset.isDragging = "false";
    };

    const handleMouseMove = (e) => {
      if (track.dataset.isDragging !== "true") return;

      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
          parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(
          Math.min(nextPercentageUnconstrained, 0),
          -100
        );

      track.dataset.percentage = nextPercentage;

      track.style.transform = `translate(${nextPercentage}%, -50%)`;

      for (const image of track.getElementsByClassName("image")) {
        image.style.objectPosition = `${100 + nextPercentage}% center`;
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="slider-wrapper">
      <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0" data-is-dragging="false">
        {slides.map((slide, index) => (
          <Card key={index} url={slide.url} name={slide.name} />
        ))}
      </div>
    </div>
  );
};

export default Slider;