import * as React from "react";
import { connect } from "react-redux";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import { RootState } from "../../store";
import { BudgetState } from "../../store/budget/types";
import { addBudgetItem, deleteBudgetItem } from "../../store/budget/actions";
import Item from "../budget-item";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    },
    addButton: {
      display: "table",
      margin: "0 auto",
      padding: theme.spacing(1),
    },
  })
);

type BudgetProps = {
  budget: BudgetState;
  addBudgetItem: typeof addBudgetItem;
  deleteBudgetItem: typeof deleteBudgetItem;
};

const Budget = (props: BudgetProps) => {
  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid container item>
          <p>${props.budget.total}</p>
        </Grid>
        {props.budget.budget.map((item, index) => (
          <Grid container item className={classes.item} key={item.id}>
            <Grid item xs={11}>
              <Item key={item.id} index={index} item={item} />
            </Grid>
            <Grid item>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => {
                  props.deleteBudgetItem(index);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <span className={classes.addButton}>
        <IconButton
          aria-label="add budget item"
          color="primary"
          onClick={props.addBudgetItem}
        >
          <AddIcon />
        </IconButton>
      </span>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  budget: state.budget,
});

export default connect(mapStateToProps, { addBudgetItem, deleteBudgetItem })(
  Budget
);
