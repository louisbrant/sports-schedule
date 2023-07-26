import Link from "next/link";

const ButtonFrom = ({ id, label, doSubmit, notForSubmit, className, error, isDisabled, isCourtCard, btnStyle, btnTxtStyle }) => (
    // <a className={className} style={btnStyle} onClick={notForSubmit===false ? doSubmit : undefined} disabled={isDisabled}>
    //   {label}
    // </a>

   
  //isDisabled creating an issue
  
    <Link href={(!isCourtCard) ? "/facility/[facilityId]/courts" : ""}
    as={(!isCourtCard) ? `/facility/${id}/courts` : ''} className={className} style={btnStyle} onClick={notForSubmit===false ? doSubmit : undefined} disabled={isDisabled}>
      <a className={className} style={btnTxtStyle}>{label}</a>
    </Link>
);

export default ButtonFrom;