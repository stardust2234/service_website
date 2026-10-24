import { useEffect, useState } from "react";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

const chatMessages = [
  { text: "Can you cover the inbox?", avatar: 0 },
  { text: "Yes — starting tomorrow.", avatar: 2 },
];
const avatarImages = [avatar1, avatar2, avatar3];

const CommunityDemo = () => {
  const [visibleAvatars, setVisibleAvatars] = useState<number[]>([]);
  const [activeAvatar, setActiveAvatar] = useState<number | null>(null);
  const [messages, setMessages] = useState<{ id: number; text: string; avatar: number; hasReaction: boolean }[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [typingAvatar, setTypingAvatar] = useState(0);
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);

  useEffect(() => {
    const avatars = [0, 1, 2];
    let phase = 0;
    let messageIndex = 0;
    const runAnimation = () => {
      if (phase < avatars.length) {
        setVisibleAvatars((previous) => [...previous, avatars[phase]]);
      } else if (phase === avatars.length) {
        setTypingAvatar(chatMessages[0].avatar);
        setActiveAvatar(chatMessages[0].avatar);
        setShowTyping(true);
      } else if (phase >= 4 && phase < 4 + chatMessages.length * 2) {
        const messagePhase = phase - 4;
        if (messagePhase % 2 === 0) {
          const messageIndexToAdd = Math.floor(messagePhase / 2);
          setShowTyping(false);
          setMessages((previous) => [...previous, { id: messageIndexToAdd, ...chatMessages[messageIndexToAdd], hasReaction: false }]);
          messageIndex = messageIndexToAdd;
        } else {
          setMessages((previous) => previous.map((message, index) => index === messageIndex - 1 ? { ...message, hasReaction: true } : message));
          const nextMessage = Math.floor(messagePhase / 2) + 1;
          if (nextMessage < chatMessages.length) {
            setTypingAvatar(chatMessages[nextMessage].avatar);
            setActiveAvatar(chatMessages[nextMessage].avatar);
            setShowTyping(true);
          }
        }
      } else if (phase === 4 + chatMessages.length * 2) {
        setMessages((previous) => previous.map((message, index) => index === chatMessages.length - 1 ? { ...message, hasReaction: true } : message));
      } else if (phase > 5 + chatMessages.length * 2) {
        setVisibleAvatars([]);
        setActiveAvatar(null);
        setMessages([]);
        setShowTyping(false);
        phase = -1;
        messageIndex = 0;
      }
      phase += 1;
    };
    const interval = setInterval(runAnimation, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-auto pt-3">
      <div className="flex h-[76px] flex-col items-start justify-start gap-1.5 overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="flex flex-row -space-x-1.5">
            {avatarImages.map((avatar, index) => (
              <div key={avatar} className={`relative h-6 w-6 cursor-pointer rounded-full border-2 transition-[transform,opacity,border-color,box-shadow] duration-300 ${visibleAvatars.includes(index) ? "scale-100 opacity-100" : "scale-75 opacity-0"} ${activeAvatar === index ? "z-20 scale-110 border-primary ring-1 ring-primary/30" : "border-card"} ${hoveredAvatar === index ? "z-20 scale-110" : ""}`} style={{ transitionDelay: `${index * 50}ms`, zIndex: hoveredAvatar === index || activeAvatar === index ? 20 : avatarImages.length - index }} onMouseEnter={() => setHoveredAvatar(index)} onMouseLeave={() => setHoveredAvatar(null)}>
                <img src={avatar} alt={`Community member ${index + 1}`} className="h-full w-full rounded-full object-cover" />
                {activeAvatar === index && showTyping && <div className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary"><div className="h-1 w-1 rounded-full bg-primary-foreground" /></div>}
              </div>
            ))}
          </div>
          <div className="rounded-full bg-primary/20 px-1.5 py-0.5 text-xs font-medium text-primary">Replies in ~2h</div>
        </div>
        <div className="flex h-[40px] w-full flex-col gap-0.5 overflow-hidden">
          {messages.map((message, index) => <div key={message.id} className="flex items-center gap-1.5 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}><img src={avatarImages[message.avatar]} alt="" className="h-4 w-4 flex-shrink-0 rounded-full" /><div className="rounded-lg bg-muted px-2 py-0.5 text-xs text-foreground">{message.text}</div>{message.hasReaction && <span className="text-xs animate-scale-in">❤️</span>}</div>)}
          {showTyping && <div className="flex items-center gap-1.5 animate-fade-in"><img src={avatarImages[typingAvatar]} alt="" className="h-4 w-4 flex-shrink-0 rounded-full" /><div className="flex gap-0.5 rounded-lg bg-muted px-2 py-1">{[0, 1, 2].map((index) => <div key={index} className="h-1 w-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${index * 150}ms`, animationDuration: "0.6s" }} />)}</div></div>}
        </div>
      </div>
    </div>
  );
};

export default CommunityDemo;
