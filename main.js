/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

let buffer_log = "";

// function beacon(index, strength) {
// 	console.log("BEACON" + ' ' + index + ' ' + strength);
// }
// function line(sourceIdx, targetIdx, strength) {
// 	console.log("LINE" + ' ' + sourceIdx + ' ' + targetIdx + ' ' + strength);
// }
// function wait() {
// 	console.log("WAIT");
// }
// function message(message) {
// 	console.log("MESSAGE " + message);
// }
function beacon(index, strength) {
	buffer_log += "BEACON" + ' ' + index + ' ' + strength + ';';
}
function line(sourceIdx, targetIdx, strength) {
	buffer_log += "LINE" + ' ' + sourceIdx + ' ' + targetIdx + ' ' + strength + ';';
}
function wait() {
	buffer_log += "WAIT" + ';';
}
function message(message) {
	buffer_log += "MESSAGE " + message + ';';
}

function sendCommands() {
	console.log(buffer_log);
	buffer_log = "";
}

/**************************************** GLOBAL VAR ****************************************/
let cells = [];
let myBase = 0;


class Cell{

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
		if (this.initialResources)
			this.resources = initialResources;
		else
			this.resources = 0;
		
		this.distance = 0;
	}

	getIndex(){
		return this.index;
	}

	getType(){
		return this.type;
	}

	updateAll(resources, myAnts, oppAnts){
		this.resources = resources;
		if (resources == 0)
			this.type = 0;
		this.myAnts = myAnts;
		this.oppAnts = oppAnts;
	}

	calculateDistance(cellsRef){
		this.pathTo = shortestPath(generateGraph(cellsRef), myBase, this.index);
		this.distance = this.pathTo.length - 1;

	}

	isNeighbour(index){
		if ((this.n0 == index || this.n1 == index || this.n2 == index || this.n3 == index || this.n4 == index || this.n5 == index))
			return true;
		return false;
	}
}



const numberOfCells = parseInt(readline()); // amount of hexagonal cells in this map
for (let i = 0; i < numberOfCells; i++) {
	var inputs = readline().split(' ');
	console.error('DBG INPUT STARTER : ' + inputs);
	const type = parseInt(inputs[0]); // 0 for empty, 1 for eggs, 2 for crystal
	
	const initialResources = parseInt(inputs[1]); // the initial amount of eggs/crystals on this cell
	const neigh0 = parseInt(inputs[2]); // the index of the neighbouring cell for each direction
	const neigh1 = parseInt(inputs[3]);
	const neigh2 = parseInt(inputs[4]);
	const neigh3 = parseInt(inputs[5]);
	const neigh4 = parseInt(inputs[6]);
	const neigh5 = parseInt(inputs[7]);

	let cell = new Cell(i, type, neigh0, neigh1, neigh2, neigh3, neigh4, neigh5, initialResources);
	cells.push(cell);
}


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

function shortPath(baseCell, targetCell) {
	let path = [];
	let currentCell = baseCell;
	while (currentCell != targetCell) {
		path.push(currentCell);
		currentCell = cells[currentCell].n0;
	}
	return path;
}



/**************************************CALCUL DISTANCE **************************************/

function generateGraph(cells) {
	let graph = {};
	for (let cell of cells) {
		graph[cell.index] = [cell.n0, cell.n1, cell.n2, cell.n3, cell.n4, cell.n5].filter(n => n != -1);
	}
	return graph;
}

function dijkstra(graph, start) {
	let distances = {};
	for (let node in graph) {
		distances[node] = Infinity;
	}
	distances[start] = 0;

	let queue = [start];
	while (queue.length > 0) {
		let currentNode = queue.shift();

		for (let neighbor of graph[currentNode]) {
			let distanceToNeighbor = 1; // Assuming all edges have a weight of 1
			let oldDistanceToNeighbor = distances[neighbor];
			let newDistanceToNeighbor = distances[currentNode] + distanceToNeighbor;

			if (newDistanceToNeighbor < oldDistanceToNeighbor) {
				distances[neighbor] = newDistanceToNeighbor;
				queue.push(neighbor);
			}
		}
	}

	return distances;
}

function shortestPath(graph, start, end) {
	let distances = dijkstra(graph, start);
	let path = [end];
	let current = end;
	while (current != start) {
		for (let neighbor of graph[current]) {
			if (distances[neighbor] == distances[current] - 1) {
				path.unshift(neighbor);
				current = neighbor;
				break;
			}
		}
	}
	return path;
}
/**************************************END CALCUL DISTANCE **************************************/


/**************************************END CALCUL DISTANCE **************************************/


for (let cell of cells)
{
	cell.calculateDistance(cells);
}


//tester si les cellules sont bien remplies en indiquant Cellule n° et ressources et voisine sep par \n
// for (let i = 0; i < numberOfCells; i++) {
// 	console.error("DBG********Cell n°" + cells[i].getIndex() + " ressources : " + cells[i].resources + '\n' + "voisines : " + cells[i].n0 + " " + cells[i].n1 + " " + cells[i].n2 + " " + cells[i].n3 + " " + cells[i].n4 + " " + cells[i].n5);
// }




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


// class rssMap {
// 	constructor(index, quantity, path) {
// 		this.index = index;
// 		this.quantity = quantity;
// 		this.path = path;
// 		this.distance = path.length() - 1;
// 	}
// }

let cellOeufs = [];
let cellCristaux = [];

for (let cell of cells) {
	if (cell.type == 1)
		cellOeufs.push(cell);
	else if (cell.type == 2)
		cellCristaux.push(cell);
}

// for (let cell of cells) 
// 	if (cell.type == 1)
// 		cellOeufs.push(new rssMap(cell.index, cell.resources, shortestPath(generateGraph(cells), myBase, cell.index)));
// 	else if (cell.type == 2)
// 		cellCristaux.push(new rssMap(cell.index, cell.resources, shortestPath(generateGraph(cells), myBase, cell.index)));
// }

cellOeufs.sort((a, b) => b.resources - a.resources);
cellOeufs.sort((a, b) => a.distance - b.distance);
cellCristaux.sort((a, b) => b.resources - a.resources);
cellCristaux.sort((a, b) => a.distance - b.distance);

//verifier le contenu des tableaux
function displayCellsOeufsAndCrist()
{
	for (let cell of cellOeufs) {
		console.error("DBG********CellOeuf n°" + cell.index + " ressources : " + cell.resources + '\t' + "distance : " + cell.distance);
	}
	
	for (let cell of cellCristaux) {
		console.error("DBG********CellCristaux n°" + cell.index + " ressources : " + cell.resources + '\t' + "distance : " + cell.distance);
	}
}

displayCellsOeufsAndCrist();
// game loop
let i = 0;
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

	console.error('DBG cellOeuf[0].resources: ' + cellOeufs[0].resources + ' | ' + cellOeufs[1].resources);
	if (cellCristaux[i].resources == 0)
	{	for (;  cellCristaux[i] && cellCristaux[i].resources == 0 ; i++)
		{}
	}
	console.error('DBG i :  ' + i);
	if(cellOeufs[0] && cellOeufs[0].resources > 0){ 
		line(cellOeufs[0].index, myBase, 1);
		if (cellOeufs[1] && cellOeufs[1].resources > 0 && cellOeufs[1].isNeighbour(myBase))
			line(cellOeufs[1].index, myBase, 1);
		if (cellOeufs[2] && cellOeufs[2].resources > 0 && cellOeufs[2].isNeighbour(myBase))
			line(cellOeufs[2].index, myBase, 1);
		if (cellOeufs[3] && cellOeufs[3].resources > 0 && cellOeufs[3].isNeighbour(myBase))
			line(cellOeufs[3].index, myBase, 1);
	}
	if (cellOeufs[1] && cellOeufs[1].resources > 0)
		line(cellOeufs[1].index, myBase, 1)
	else if (cellOeufs[2] && cellOeufs[2].resources > 0)
		line(cellOeufs[2].index, myBase, 1)
	else if (cellOeufs[3] && cellOeufs[3].resources > 0 && cellOeufs[3].distance < cellCristaux[i].distance)
		line(cellOeufs[3].index, myBase, 1)
	else if (cellCristaux[i] && cellCristaux[i].resources > 0)
		line(cellCristaux[i].index, myBase, 1)

		displayCellsOeufsAndCrist();

	sendCommands();
	// Write an action using console.log()
	// To debug: console.error('Debug messages...');
	// beacon(26, 50);
	// beacon(33, 50);
	// line(myBase, bestCell, 100);

	// WAIT | LINE <sourceIdx> <targetIdx> <strength> | BEACON <cellIdx> <strength> | MESSAGE <text>
	// console.log('BEACON' + " 9" + " 50");

}
