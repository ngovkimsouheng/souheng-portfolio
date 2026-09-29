import { TypingAnimation } from "@/components/ui/typing-animation";

export default function TypingAnimationDemo7() {
  return (
    <div className="flex-1 space-y-8">
      <div>
        <p className="text-muted-foreground mb-2 text-sm">
          With blinking cursor (default) - watch during pause
        </p>
        <TypingAnimation
          words={["DESIGNER", "DEVELOPER"]}
          blinkCursor={true}
          pauseDelay={2000}
          loop
          className="text-4xl font-bold"
        >
          DESIGNER
        </TypingAnimation>
      </div>
    </div>
  );
}
