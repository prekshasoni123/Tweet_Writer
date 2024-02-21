
import React, { useState } from 'react';

function App() {

  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedTone, setSelectedTone] = useState('informative');
  const [translatedOutput, setTranslatedOutput] = useState('');

  const handleTranslation = async () => {

    try {

      if (translatedOutput) {
        setTranslatedOutput("")
      }
      const response = await fetch('http://localhost:8000/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify
          ({

            message: inputText,
            prompt: `Translate the above text to ${selectedLanguage} with a ${selectedTone} tone.`

          }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();

      if (result.choices && result.choices.length > 0) {
        setTranslatedOutput(result.choices[0].message.content);
      } else {
        console.warn('No translation result found.');
        setTranslatedOutput('');
      }

    }
    catch (error) {
      console.error('Error during translation', error)
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedOutput);
  };
  return (

    // <div className="mx-auto max-w-5xl pt-32 pb-12 md:pt-40 md:pb-20 px-4">
    //   <div className="relative max-w-3xl mx-auto pb-12">
    //     <h2 className="font-inter-tight text-center text-3xl md:text-4xl font-bold text-zinc-900 mb-16">
    //       Tweet Writer
    //     </h2>
    <div className="mx-auto bg-slate-50 max-w-3xl pt-16 pb-16 md:pt-16 md:pb-16 mt-8 mb-8 px-4 border-dashed border-2 border-slate-500 rounded-xl outline outline-offset-4 outline-slate-600 transition-transform transform hover:scale-105">
      <div className="relative max-w-3xl mx-auto pb-12">
        <h2 className="font-inter-tight text-center text-3xl md:text-5xl md:pb-16 font-bold mb-16">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-800 to-violet-800">Tweet Writer</span>
        </h2>
        {/* <p className="text-lg text-slate-600">
          Everything you need to start creating with AI for individual or team
        </p> */}
        <div className="flex items-center justify-center flex-col h-screen">


          <div className="w-full max-w-2xl p-4">
            <form className=''>
              <div className="mb-4 mt-16">
                <label className="block text-slate-900 text-md font-semibold mb-2 mt-8" htmlFor="enterInput">
                  Tweet to rewrite(Paste your content here)
                </label>
                <textarea
                  className="shadow-lg text-md appearance-none border-2 border-slate-500 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-2 hover:border-double hover:border-slate-950 transition-transform transform hover:scale-105"
                  id="enterInput"
                  type="text"
                  rows="6"
                  placeholder="Write your content..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="block text-slate-900 text-md font-semibold mb-2" htmlFor="languageDropdown">
                  Tone
                </label>
                <select
                  className="block shadow-lg text-md appearance-none w-full bg-white border-2 border-slate-500 px-3 py-3 rounded-lg leading-tight focus:outline-none focus:shadow-outline hover:border-2 hover:border-double hover:border-slate-950 transition-transform transform hover:scale-105"
                  id="toneDropdown"
                  value={selectedTone}
                  onChange={(e) => setSelectedTone(e.target.value)}
                >
                  <option value="standard">Standard</option>
                  <option value="professional">Professional</option>
                  <option value="informative">Informative</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-slate-900 text-md font-semibold mb-2" htmlFor="languageDropdown">
                  Language
                </label>
                <select
                  className="block appearance-none text-md w-full bg-white border-2 border-slate-500 px-3 py-2 rounded-lg shadow-lg leading-tight focus:outline-none focus:shadow-outline hover:border-2 hover:border-double hover:border-slate-950 transition-transform transform hover:scale-105"
                  id="languageDropdown"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  {/* <option value="hi">Hindi</option>
                  <option value="gu">Gujarati</option> */}
                </select>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-slate-900 text-lg hover:bg-slate-600 text-slate-100 font-semibold py-2 px-8  shadow-lg rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                  type="button"
                  onClick={handleTranslation}
                >
                  Rewrite
                </button>
              </div>


              <div className="mb-12 mt-8 relative">

                <textarea
                  className="shadow-lg appearance-none border-2 border-slate-500 rounded-lg w-full py-2 pl-4 pr-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-2 hover:border-double hover:border-slate-950 transition-transform transform hover:scale-105"
                  id="enterInput"
                  type="text"
                  rows="10"
                  placeholder="Your content inspiration is here..."
                  readOnly
                  value={translatedOutput}
                />


                <button
                  className="absolute bottom-4 text-sm right-5 bg-slate-600 hover:bg-slate-500 text-slate-200 font-semibold py-1 px-2 rounded-lg focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleCopy}
                >
                  Copy
                </button>



              </div>

            </form>
          </div>
        </div>
      </div>

      <div className=""></div>
    </div>


  );
};

export default App;

