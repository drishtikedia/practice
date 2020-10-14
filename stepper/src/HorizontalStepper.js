

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import StckyHeadTable from './Tables';
import RecipeReviewCard from './Card';
import AddressForm from './addressform';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  backButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(8)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft:theme.spacing(10)
  },
}));

function getSteps() {
  return ['Seller', 'Business', 'Product','Policy','Applicant','My quote'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <RecipeReviewCard/>;
    case 1:
      return<Paper elevation={1}><StckyHeadTable/></Paper>;
    case 2:
      return <AddressForm/>;
    case 3:
      return 'Policy';
    case 4:
      return 'Applicant';
    case 5:
      return 'My quote';
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    setActiveStep(0);
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}  alternativeLabel >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset} className={classes.backButton} variant="outlined" color="primary" >Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <Button
                variant="outlined"
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
                >
                Back
                </Button>
              </Grid>
              <Grid item xs={2}>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
              </Grid>
              
            </Grid>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
