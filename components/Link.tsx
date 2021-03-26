import { useRouter } from 'next/router';
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
   root: {
      '& a': {
        cursor: 'pointer'
      }
   }
});
export default function Link({ to, style, children }) {
   const classes = useStyles();
   const router = useRouter();
   return (
      <div className={classes.root}>
         <a onClick={() => router.push(`${to}`)} className={`${style}`}>{children}</a>
      </div>
   )
}
