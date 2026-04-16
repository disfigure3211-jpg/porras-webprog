import React from 'react';
import kickGif from '../assets/kick.gif';

function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-white px-6 py-12 text-center text-slate-900">
      <img src={kickGif} alt="Kick" className="mx-auto h-56 w-auto rounded-3xl shadow-2xl shadow-slate-900/10" />
      <div className="max-w-xl">
        <h1 className="mb-4 text-4xl font-bold">Page Not Found</h1>
        <p className="text-base leading-7 text-slate-700">
          The path you tried to reach landed on Grimmjow’s lost zone. The link you followed is broken or the page no longer exists.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;