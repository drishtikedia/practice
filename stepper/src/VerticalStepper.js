import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AddressForm from './addressform';
import { StepConnector } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
    width: '60vw',
    height:'100vh'
  },
}));

function getSteps() {
  return ['Lets get Started', 'Business Details', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm/>;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
    <Grid container spacing={3} >
        <Grid item xs={3}>
        <Stepper activeStep={activeStep} orientation="vertical" line >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel disabled >{label}</StepLabel>
            
            </Step>
        ))}
        </Stepper>
        </Grid>
        <Grid item xs={9} >
        {activeStep === steps.length ? (
            <Paper square elevation={2} className={classes.resetContainer}>
                  <Typography>All steps completed - you&apos;re finished</Typography>
                  <Button onClick={handleReset} className={classes.button}  >
                    Reset
                  </Button>
            </Paper>
          ) : (
            <div>
            <Typography>{getStepContent(activeStep)}</Typography>
            <div className={classes.actionsContainer}>
            <div>
                <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                >
                Back
                </Button>
                <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
            </div>
            </div>
          )}
        </Grid>
    </Grid>
      
    </div>
  );
}
