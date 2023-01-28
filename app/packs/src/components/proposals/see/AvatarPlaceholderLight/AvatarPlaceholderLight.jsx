import React from "react";
import "./style.css";

export const AvatarPlaceholderLight = ({ photo, size, color, style }) => {
  return (
    <div
      style={{
        ...{
          backgroundImage:
            (photo && color === "light green") ||
            (photo && color === "purple") ||
            (photo && color === "creme") ||
            (photo && color === "green") ||
            (photo && color === "light purple") ||
            (!photo && color === "default") ||
            (color === "default" && size === "xs")
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : photo && size === "sm" && color === "default"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : photo && size === "md" && color === "default"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : photo && size === "lg" && color === "default"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "sm" && color === "purple"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "xs" && color === "purple"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "md" && color === "purple"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "lg" && color === "purple"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "xs" && color === "light purple"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "sm" && color === "light purple"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "md" && color === "light purple"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "lg" && color === "light purple"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "xs" && color === "creme"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "sm" && color === "creme"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "md" && color === "creme"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "lg" && color === "creme"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "xs" && color === "green"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "sm" && color === "green"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "md" && color === "green"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "lg" && color === "green"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "xs" && color === "light green"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "sm" && color === "light green"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "md" && color === "light green"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : !photo && size === "lg" && color === "light green"
              ? "url(https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png)"
              : undefined,
          backgroundPosition: photo || color === "default" ? "50% 50%" : undefined,
          backgroundSize:
            photo || color === "default"
              ? "cover"
              : !photo &&
                (color === "purple" ||
                  color === "light purple" ||
                  color === "creme" ||
                  color === "green" ||
                  color === "light green")
              ? "100% 100%"
              : undefined,
          height:
            (photo && color === "light green") ||
            (photo && color === "purple") ||
            (photo && color === "creme") ||
            (photo && color === "green") ||
            (photo && color === "light purple") ||
            (!photo && color === "default") ||
            (color === "light green" && size === "xs") ||
            (color === "purple" && size === "xs") ||
            (color === "creme" && size === "xs") ||
            (color === "default" && size === "xs") ||
            (color === "green" && size === "xs") ||
            (color === "light purple" && size === "xs")
              ? "24px"
              : size === "sm" &&
                (!photo || color === "default") &&
                (photo ||
                  color === "purple" ||
                  color === "light purple" ||
                  color === "creme" ||
                  color === "green" ||
                  color === "light green")
              ? "32px"
              : size === "md" &&
                (!photo || color === "default") &&
                (photo ||
                  color === "purple" ||
                  color === "light purple" ||
                  color === "creme" ||
                  color === "green" ||
                  color === "light green")
              ? "40px"
              : size === "lg" &&
                (!photo || color === "default") &&
                (photo ||
                  color === "purple" ||
                  color === "light purple" ||
                  color === "creme" ||
                  color === "green" ||
                  color === "light green")
              ? "120px"
              : undefined,
          position:
            !photo &&
            (color === "purple" ||
              color === "light purple" ||
              color === "creme" ||
              color === "green" ||
              color === "light green")
              ? "relative"
              : undefined,
          width:
            (photo && color === "light green") ||
            (photo && color === "purple") ||
            (photo && color === "creme") ||
            (photo && color === "green") ||
            (photo && color === "light purple") ||
            (!photo && color === "default") ||
            (color === "light green" && size === "xs") ||
            (color === "purple" && size === "xs") ||
            (color === "creme" && size === "xs") ||
            (color === "default" && size === "xs") ||
            (color === "green" && size === "xs") ||
            (color === "light purple" && size === "xs")
              ? "24px"
              : size === "sm" &&
                (!photo || color === "default") &&
                (photo ||
                  color === "purple" ||
                  color === "light purple" ||
                  color === "creme" ||
                  color === "green" ||
                  color === "light green")
              ? "32px"
              : size === "md" &&
                (!photo || color === "default") &&
                (photo ||
                  color === "purple" ||
                  color === "light purple" ||
                  color === "creme" ||
                  color === "green" ||
                  color === "light green")
              ? "40px"
              : size === "lg" &&
                (!photo || color === "default") &&
                (photo ||
                  color === "purple" ||
                  color === "light purple" ||
                  color === "creme" ||
                  color === "green" ||
                  color === "light green")
              ? "120px"
              : undefined,
        },
        ...style,
      }}
    >
      <React.Fragment>
        {!photo &&
          (color === "purple" ||
            color === "light purple" ||
            color === "creme" ||
            color === "green" ||
            color === "light green") && (
            <React.Fragment>
              <img
                className={"avatar-placeholder-light-mask-group"}
                style={{
                  height:
                    size === "sm"
                      ? "32px"
                      : size === "xs"
                      ? "24px"
                      : size === "md"
                      ? "40px"
                      : size === "lg"
                      ? "120px"
                      : undefined,
                  width:
                    size === "sm"
                      ? "32px"
                      : size === "xs"
                      ? "24px"
                      : size === "md"
                      ? "40px"
                      : size === "lg"
                      ? "120px"
                      : undefined,
                }}
                src={
                  size === "sm" && color === "purple"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-20@2x.png"
                    : size === "xs" && color === "purple"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-21@2x.png"
                    : size === "md" && color === "purple"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-22@2x.png"
                    : size === "lg" && color === "purple"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-23@2x.png"
                    : size === "xs" && color === "light purple"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-24@2x.png"
                    : size === "sm" && color === "light purple"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-25@2x.png"
                    : size === "md" && color === "light purple"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-26@2x.png"
                    : size === "lg" && color === "light purple"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-27@2x.png"
                    : size === "xs" && color === "creme"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-28@2x.png"
                    : size === "sm" && color === "creme"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-29@2x.png"
                    : size === "md" && color === "creme"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-30@2x.png"
                    : size === "lg" && color === "creme"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-31@2x.png"
                    : size === "xs" && color === "green"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-32@2x.png"
                    : size === "sm" && color === "green"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-33@2x.png"
                    : size === "md" && color === "green"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-34@2x.png"
                    : size === "lg" && color === "green"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-35@2x.png"
                    : size === "xs" && color === "light green"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-36@2x.png"
                    : size === "sm" && color === "light green"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-37@2x.png"
                    : size === "md" && color === "light green"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-38@2x.png"
                    : size === "lg" && color === "light green"
                    ? "https://anima-uploads.s3.amazonaws.com/projects/63d17ab1ab83f3e1623df3e0/releases/63d17ace901b2070f6fb1dd2/img/mask-group-39@2x.png"
                    : undefined
                }
              />
            </React.Fragment>
          )}
      </React.Fragment>
    </div>
  );
};
