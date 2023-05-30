/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

function beacon(index, strength) {
	console.log("BEACON" + ' ' + index + ' ' + strength);
}
function line(sourceIdx, targetIdx, strength) {
	console.log("LINE" + ' ' + sourceIdx + ' ' + targetIdx + ' ' + strength);
}
function wait() {
	console.log("WAIT");
}
function message(message) {
	console.log("MESSAGE " + message);
}

class Cell{
	// constructor(index)
	// {
	// 	this.index = index;
	// }
	constructor(index, type, n0, n1, n2, n3, n4, n5, initialResources)
	{
		this.index = index;
		this.type = type;
		this.n0 = n0;
		this.n1 = n1;
		this.n2 = n2;
		this.n3 = n3;
		this.n4 = n4;
		this.n5 = n5;

		this.initialResources = initialResources;
		this.resources = initialResources;
	}

	getIndex(){
		return this.index;
	}

	getType(){
		return this.type;
	}


	updateAll(resources, myAnts, oppAnts){
		this.resources = resources;
		this.myAnts = myAnts;
		this.oppAnts = oppAnts;
	}
}

const numberOfCells = parseInt(readline()); // amount of hexagonal cells in this map
for (let i = 0; i < numberOfCells; i++) {
	var inputs = readline().split(' ');
	const type = parseInt(inputs[0]); // 0 for empty, 1 for eggs, 2 for crystal
	
	const initialResources = parseInt(inputs[1]); // the initial amount of eggs/crystals on this cell
	const neigh0 = parseInt(inputs[2]); // the index of the neighbouring cell for each direction
	const neigh1 = parseInt(inputs[3]);
	const neigh2 = parseInt(inputs[4]);
	const neigh3 = parseInt(inputs[5]);
	const neigh4 = parseInt(inputs[6]);
	const neigh5 = parseInt(inputs[7]);

	//print les valeur avant new Cell
	console.error("PRINT AVANT new cell, cellule numero " + i + " ressources : " + initialResources + '\n' + "voisines : " + neigh0 + " " + neigh1 + " " + neigh2 + " " + neigh3 + " " + neigh4 + " " + neigh5);
	let cell = new Cell(i, type, neigh0, neigh1, neigh2, neigh3, neigh4, neigh5, initialResources);
	cells.push(cell);

}

//tester si les cellules sont bien remplies en indiquant Cellule n° et ressources et voisine sep par \n
for (let i = 0; i < numberOfCells; i++) {
	console.error("DBG********Cell n°" + cells[i].getIndex() + " ressources : " + cells[i].resources + '\n' + "voisines : " + cells[i].n0 + " " + cells[i].n1 + " " + cells[i].n2 + " " + cells[i].n3 + " " + cells[i].n4 + " " + cells[i].n5);
}

let myBase = 0;
const numberOfBases = parseInt(readline());
var inputs = readline().split(' ');
for (let i = 0; i < numberOfBases; i++) {
	const myBaseIndex = parseInt(inputs[i]);
	myBase = myBaseIndex;
}
var inputs = readline().split(' ');
for (let i = 0; i < numberOfBases; i++) {
	const oppBaseIndex = parseInt(inputs[i]);
}

//fonction qui prend en parametre un tableau de Cell et cherche la cellule avec le plus de ressources
function findBestCell(cells){
	let bestCell = 0;
	for (let i = 0; i < cells.length; i++) {
		if(cells[i].resources > bestCell){
			bestCell = cells[i].getIndex();
		}
	}
	return bestCell;
}

function getArrCellsAreResources(cells){
	let ressourcesCells = [];

	for (let cell of cells)
	{
		if (cell.resources > 0)
			ressourcesCells.push(cell);
	}
	return ressourcesCells;
}

function debug(cell)
{
	console.error("Case " + cell.getIndex() + '\n' + 'n0 = ' + cell.neighAll[0]+ '\n' + 'n1 = ' + cell.neighAll[1] + '\n' + 'n2 = ' + cell.neighAll[2]);
}

debug(cells[26]);

// game loop
while (true) {
	//boucle for pour remplir le tableau de cellules
	for (let i = 0; i < numberOfCells; i++) {
		var inputs = readline().split(' ');
		const resources = parseInt(inputs[0]); // the current amount of eggs/crystals on this cell
		const myAnts = parseInt(inputs[1]); // the amount of your ants on this cell
		const oppAnts = parseInt(inputs[2]); // the amount of opponent ants on this cell
		cells[i].updateAll(resources, myAnts, oppAnts);
	}

	let CellsRessources = getArrCellsAreResources(cells);
	let bestCell = findBestCell(CellsRessources);
	console.error(bestCell);
	
	// Write an action using console.log()
    // To debug: console.error('Debug messages...');
	// beacon(26, 50);
	// beacon(33, 50);
	line(myBase, bestCell, 100);
	
    // WAIT | LINE <sourceIdx> <targetIdx> <strength> | BEACON <cellIdx> <strength> | MESSAGE <text>
    // console.log('BEACON' + " 9" + " 50");


}
