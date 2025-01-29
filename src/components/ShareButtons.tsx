import React from 'react';
import { EnvelopeIcon, ShareIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface ShareButtonsProps {
  className?: string;
  mainStyleName: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ className = '', mainStyleName }) => {
  // Function to share results via email
  const shareViaEmail = () => {
    const subject = encodeURIComponent('My Teaching Style Profile');
    const body = encodeURIComponent(`
      I just completed the Teaching Style Assessment!
      My dominant teaching style is: ${mainStyleName}
      
      Discover your teaching style at: ${window.location.origin}
    `);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Function to share results on Twitter
  const shareViaTwitter = () => {
    const text = encodeURIComponent(
      `I just discovered my teaching style with Anga! My dominant style is: ${mainStyleName}. Find yours at: ${window.location.origin} #TeachingStyles #Education`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      <Button
        variant="outline"
        onClick={shareViaEmail}
        className="flex items-center gap-2"
      >
        <EnvelopeIcon className="w-5 h-5" />
        Share via Email
      </Button>
      <Button
        variant="outline"
        onClick={shareViaTwitter}
        className="flex items-center gap-2"
      >
        <ShareIcon className="w-5 h-5" />
        Share on Twitter
      </Button>
    </div>
  );
};

export default ShareButtons;