import React, {useState, useEffect} from 'react';
import './index.css';


const changingTextDelay = 15;
const headerQuotes = ["Stay updated", "Dive in", "Read news", "Enjoy stories"];

export default function ChangingText() {
  const [headerText, setHeaderText] = useState("");
  const screenWidth = window.screen.width;
  let currQuoteI = 0;
  let currLetter = 0;
  let countdown = 0;
  let swapDir = false;
  let currQuoteText = "";
  useEffect(() => {
    const interval = setInterval(() => {
      if(currQuoteText === "") {
        if(swapDir) {
          swapDir = false;
          currLetter = 0+0; 
          currQuoteI = (currQuoteI + 1) % headerQuotes.length;
        }else{
          currQuoteText = headerQuotes[currQuoteI].slice(0, currLetter)
          setHeaderText(currQuoteText );
          currLetter ++;
        }
      }else if(currQuoteText === headerQuotes[currQuoteI] && !swapDir){
          if(countdown === changingTextDelay){
            swapDir = true;
            countdown = 0;
          }
          countdown++;
      }else {
        currQuoteText = headerQuotes[currQuoteI].slice(0, currLetter)
        setHeaderText(currQuoteText);
        currLetter += swapDir ? -1 : 1;
      }

    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header-left">
      <p> {headerText} </p>
    </div>
  );
}
