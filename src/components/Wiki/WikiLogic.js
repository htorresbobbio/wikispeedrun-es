import { useNavigate } from "react-router-dom";
import { useNotifications } from "@mantine/notifications";

const WikiLogic = () => {
  let navigate = useNavigate();
  const notifications = useNotifications();

  const errorParams = {
    title: "Link incorrecto",
    message: "Intenta con otro",
    autoClose: 1500,
    color: "red",
  };

  const validateHref = (hrefText) => {
    if (hrefText === undefined) return null;
    if (hrefText.startsWith("/wiki/")) {
      return hrefText;
    }

    return null;
  };

  const validateNavigation = (hrefText) => {
    if (hrefText === undefined) return null;
    if (hrefText.startsWith("#")) {
      return hrefText;
    } else {
      return null;
    }
  };

  const handleWikiArticleClick = (e) => {
    e.preventDefault();

    // if clicked on a link
    const hrefText = e?.target?.attributes[0]?.value;
    let href = validateHref(hrefText);

    //  Show error:
    // if its a cite note
    // an image
    if (hrefText?.includes("#cite_note-") || e?.target?.nodeName === "IMG") {
      notifications.showNotification(errorParams);
      return;
    }

    if (href) {
      navigate(href);
      return;
    }

    // if parent is a link
    href = validateHref(e.target?.parentNode?.attributes[0]?.value);
    if (href) {
      navigate(href);
      return;
    }

    // if clicked on navigation link
    let navigateId = validateNavigation(
      e.target?.parentNode?.attributes[0]?.value
    );
    if (navigateId) {
      // try to scroll to the element
      navigateId = navigateId.replaceAll("#", "");
      const element = document.getElementById(navigateId);
      element?.scrollIntoView();
      return;
    }

    // show notification about non-wiki link
    if (
      e?.target?.className === "external text" ||
      e?.target?.className === "new" ||
      e?.target?.className === "geo-dec" ||
      e?.target?.parentNode?.className === "reference-text" ||
      e?.target?.parentNode?.className === "external text" ||
      e?.target?.parentNode?.className === "new"
    ) {
      notifications.showNotification(errorParams);
      return;
    }
  };

  return { handleWikiArticleClick };
};

export default WikiLogic;
