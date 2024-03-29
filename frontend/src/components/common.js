import { Tooltip } from "react-bootstrap";

export const formatDate = (date) => {
  const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };
  return (new Date(date)).toLocaleDateString('en-US', DATE_OPTIONS);
}

export const reloadPage = () => {
  window.location.reload();
}

export const renderTooltip = (msg) => (
    <Tooltip id="button-tooltip">
      {msg}
    </Tooltip>
);