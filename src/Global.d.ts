declare module "*.module.css";
declare module "*.module.scss";
declare module "*.scss" {
  const classNames: Record<string, string>;
  export default classNames;
}
