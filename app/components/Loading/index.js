import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ text = 'Carregando...' }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-100 via-sky-50 to-green-50 flex flex-col items-center justify-center z-50">
      <div className="relative w-full max-w-lg">
        {/* Nuvens */}
        <div className="absolute top-10 left-10">
          <div className="animate-float-slow">
            <div className="w-20 h-6 bg-white rounded-full shadow-md opacity-80" />
            <div className="w-12 h-6 bg-white rounded-full -mt-4 ml-4 shadow-md opacity-80" />
          </div>
        </div>
        <div className="absolute top-6 right-20">
          <div className="animate-float-delayed">
            <div className="w-24 h-8 bg-white rounded-full shadow-md opacity-80" />
            <div className="w-16 h-8 bg-white rounded-full -mt-5 ml-6 shadow-md opacity-80" />
          </div>
        </div>

        {/* Sol */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full animate-pulse shadow-lg" />
          <div className="absolute inset-0 w-20 h-20 rounded-full animate-spin-slow">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-6 bg-yellow-300"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 30}deg)`,
                  transformOrigin: '0 0',
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        </div>

        {/* Trator movendo-se */}
        <div className="relative animate-tractor-move">
          <div className="w-44 h-28 relative">
            {/* Corpo do trator */}
            <div className="absolute bottom-0 w-32 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg">
              {/* Detalhes do trator */}
              <div className="absolute -top-4 right-2 w-16 h-14 bg-gradient-to-br from-sky-200 to-sky-300 rounded-lg shadow-md" />
              <div className="absolute top-2 left-2 w-8 h-3 bg-yellow-400 rounded-full" />
            </div>
            
            {/* Rodas com animação de rotação */}
            <div className="absolute bottom-1 left-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-4 border-gray-300 animate-spin shadow-inner" />
            </div>
            <div className="absolute -bottom-1 right-8">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-4 border-gray-300 animate-spin shadow-inner" />
            </div>
          </div>
        </div>

        {/* Grama animada */}
        <div className="absolute bottom-0 w-full flex justify-center space-x-1">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-12 bg-gradient-to-t from-green-600 to-green-400 rounded-t-full animate-grass-wave"
              style={{
                animationDelay: `${i * 0.1}s`,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>

        {/* Poeira do trator */}
        <div className="absolute bottom-8 left-10 flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-brown-200 rounded-full animate-dust"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Texto com animação suave */}
      <div className="mt-20 text-xl font-semibold text-green-700 animate-fade-in">
        <span className="tracking-wide">{text}</span>
        <span className="animate-bounce-dots">...</span>
      </div>
    </div>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;
