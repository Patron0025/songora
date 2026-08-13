import React from "react";
import ReactDOM from "react-dom/client";
import SongoraApp from "./App.jsx";

const responsiveCss = `
html,body,#root{width:100%;max-width:100%;margin:0}body{overflow-x:hidden}.songora-root{width:100%!important;max-width:100%!important}
.songora-root.device-mobile,.songora-root.device-tablet{min-height:100dvh!important;border-radius:0!important;overflow-x:hidden!important}
.songora-root.device-mobile .wizard,.songora-root.device-tablet .wizard{display:flex!important;flex-direction:column!important;width:100%!important;max-width:100%!important;min-width:0!important;overflow:visible!important}
.songora-root.device-mobile .rail,.songora-root.device-tablet .rail{width:100%!important;max-width:100%!important;height:auto!important;flex:0 0 auto!important;display:flex!important;flex-direction:row!important;align-items:center!important;gap:6px!important;padding:8px 10px!important;overflow-x:auto!important;overflow-y:hidden!important;border-right:0!important;border-bottom:1px solid var(--ink-3)!important;position:sticky!important;top:0!important;z-index:50!important;background:rgba(20,24,26,.98)!important;box-sizing:border-box!important}
.songora-root.device-mobile .rail-item,.songora-root.device-tablet .rail-item{flex:0 0 auto!important;min-width:max-content!important;padding:7px 9px!important;white-space:nowrap!important}
.songora-root.device-mobile .rail-item:not(:last-child)::before,.songora-root.device-tablet .rail-item:not(:last-child)::before{display:none!important}
.songora-root.device-mobile .wizard-main,.songora-root.device-tablet .wizard-main,.songora-root.device-mobile .wizard-panel,.songora-root.device-tablet .wizard-panel{width:100%!important;max-width:100%!important;min-width:0!important;overflow:visible!important;box-sizing:border-box!important}
.songora-root.device-tablet .wizard-main{padding:18px!important}.songora-root.device-tablet .wizard-panel{padding:20px!important}.songora-root.device-tablet .grid-2,.songora-root.device-tablet .grid-3,.songora-root.device-tablet .grid-4{grid-template-columns:repeat(2,minmax(0,1fr))!important}
.songora-root.device-mobile .header{padding:12px!important}.songora-root.device-mobile .header-right{gap:6px!important}.songora-root.device-mobile .header .lang-switch{display:flex!important}.songora-root.device-mobile .lang-btn{padding:4px 6px!important;font-size:10px!important}.songora-root.device-mobile .credits-pill{padding:5px 8px!important}.songora-root.device-mobile .avatar{width:28px!important;height:28px!important}
.songora-root.device-mobile .wizard-main{padding:10px!important}.songora-root.device-mobile .wizard-panel{padding:14px!important;border-radius:12px!important}.songora-root.device-mobile .rail-label{display:none!important}.songora-root.device-mobile .grid-2,.songora-root.device-mobile .grid-3,.songora-root.device-mobile .grid-4{grid-template-columns:minmax(0,1fr)!important}
.songora-root.device-mobile .opt-card,.songora-root.device-mobile .new-song-card,.songora-root.device-mobile .project-card,.songora-root.device-mobile .textarea,.songora-root.device-mobile .text-input{width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important}
.songora-root.device-mobile .wizard-nav{width:100%!important;display:flex!important;gap:8px!important;position:sticky!important;bottom:0!important;z-index:40!important;padding:10px 0 4px!important;background:linear-gradient(to top,var(--ink) 82%,transparent)!important}.songora-root.device-mobile .wizard-nav .btn-ghost,.songora-root.device-mobile .wizard-nav .btn-primary{flex:1 1 0!important;min-width:0!important;min-height:44px!important}
.songora-root.device-mobile .page{padding:18px 14px!important}.songora-root.device-mobile .landing{min-height:100dvh!important;padding:16px!important}.songora-root.device-mobile .landing-body{flex-direction:column!important;align-items:stretch!important;padding:24px 0 18px!important;gap:28px!important}.songora-root.device-mobile .landing-hero,.songora-root.device-mobile .landing-visual{min-width:0!important;width:100%!important}.songora-root.device-mobile .landing-hero h1{font-size:clamp(34px,11vw,46px)!important}.songora-root.device-mobile .vinyl{width:160px!important;height:160px!important}
@media(max-width:1100px){.wizard{flex-direction:column!important;overflow:visible!important}.rail{width:100%!important;height:auto!important;flex-direction:row!important;overflow-x:auto!important;overflow-y:hidden!important;border-right:0!important;border-bottom:1px solid var(--ink-3)!important;padding:8px 10px!important;gap:6px!important}.rail-item{flex:0 0 auto!important;min-width:max-content!important}.rail-item:not(:last-child)::before{display:none!important}.wizard-main,.wizard-panel{width:100%!important;max-width:100%!important;min-width:0!important}}
@media(max-width:767px){.songora-root{min-height:100dvh!important;border-radius:0!important;overflow-x:hidden!important}.rail-label{display:none!important}.grid-2,.grid-3,.grid-4{grid-template-columns:minmax(0,1fr)!important}}
`;

const style = document.createElement("style");
style.id = "songora-responsive-hotfix";
style.textContent = responsiveCss;
document.head.appendChild(style);

function detectDevice() {
  const ua = navigator.userAgent || "";
  const uaMobile = /Android|iPhone|iPod|Mobile|Windows Phone/i.test(ua);
  const uaTablet = /iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua));
  const uaDataMobile = navigator.userAgentData?.mobile === true;
  const shortest = Math.min(window.screen?.width || innerWidth, window.screen?.height || innerHeight);
  const touch = navigator.maxTouchPoints > 0 || matchMedia("(pointer: coarse)").matches;
  if (uaDataMobile || uaMobile || (touch && shortest <= 767) || innerWidth <= 767) return "mobile";
  if (uaTablet || (touch && shortest <= 1180) || innerWidth <= 1100) return "tablet";
  return "desktop";
}

function syncDeviceClass() {
  const app = document.querySelector(".songora-root");
  if (!app) return;
  const target = `device-${detectDevice()}`;
  if (app.classList.contains(target)) return;
  app.classList.remove("device-mobile", "device-tablet", "device-desktop");
  app.classList.add(target);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SongoraApp />
  </React.StrictMode>
);

requestAnimationFrame(syncDeviceClass);
window.addEventListener("resize", syncDeviceClass);
window.addEventListener("orientationchange", syncDeviceClass);

const observer = new MutationObserver(syncDeviceClass);
observer.observe(document.getElementById("root"), { subtree: true, attributes: true, attributeFilter: ["class"] });
