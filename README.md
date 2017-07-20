# d3-ellipse-force

This plugin provides `ellipseForce`, an alternative for components `manyBodies` and `collision`  in `d3-force`-module. EllipseForce can be used to create force-directed graph layouts where nodes are ellipses or unequal rectangles, e.g. labels or text snippets, which often require wide and low rectangles. 

Though ellipseForce calculates elliptic forces, the graphical representation of the node can be a rectangle: Force-directed graphs don't generally work well if nodes are calculated as straight-angled objects -- elliptic shapes allow nodes to nudge and slide past each others in a way that is worth the risk of slight overlap in corners.     

Typically force directed graphs treat nodes as circles that 'radiate' their force equally to all directions. EllipseForce changes the shape of this repulsion to be ellipse. Assume that our node is shaped as a wide and low ellipse. Now the repulsion is stronger when the other object is on the same level with the ellipse, on the longer radius and gets weaker as the object rotates towards the shorter radius. Same with the overlaps, if the overlap is happening on the longer radius of the ellipse, then the other object is pushed harder to that direction. See comments in [src/ellipseForce.js](src/ellipseForce.js) for further explanation. 

In d3 v.4, force calculations are divided into components, where one component can be force to push nodes away from each other (`manyBodies`), another to make sure that they don't overlap (`collision`) and one to make links pull nodes together (`links`). Like many older force layout algorithms, `ellipseForce` treats pushing apart and avoiding overlaps as same task, thus replacing both `manyBodies` and `collision`. You can still use other d3-force components with it. 

A price we have to pay for better layout for labels is performance. EllipseForce doesn't use quadtrees, and as such doesn't scale for hundreds of nodes. It is developed in a hurry and I don't have the time or capacity to think if quadtrees would work at all and how should they be used with elliptic nodes.   

## Installing

If you use NPM, `npm install d3-ellipse-force`. Otherwise, download the [latest release](https://github.com/d3/d3-ellipse-force/releases/latest).

## API Reference

Use ellipseForce as **force** in d3's [**forceSimulation**](https://github.com/d3/d3-force#simulation_force).  

<a href="#ellipseForce" name="ellipseForce">#</a> <b>ellipseForce</b>([*padding*, *innerRepulse*, *outerRepulse*])

ellipseForce can take three parameters, *padding*(=4) *innerRepulse*(=.5) and *outerRepulse*(=.5). *innerRepulse* is used to calculate the strength of repulsion when nodes are inside each other, aka. overlap. *outerRepulse* is the base strength of repulsion towards other, non-overlapping nodes. It dissipates fast.  

Example:

    var simulation = d3.forceSimulation(nodes)
        .force("charge", d3.ellipseForce())
        .force("link", d3.forceLink(links))
        .force("center", d3.forceCenter());

## Other

I have struggled with rectangular nodes and force-directed graphs several times while developing [Kataja, visualisation tool for biolinguistics](https://github.com/jpurma/Kataja). It would be useful to have a dynamic algorithm for placing those syntactic elements that don't have one fixed place in a tree, but when nodes can contain snippets of text with various length, common algorithms either reserve too much or too little space for node. Attempts to modify them to understand rectangles resulted in jumpy graphs that don't settle nicely. These ellipses worked fine. It seems that other people in visualisation have experienced similar problems with force-directed algorithms, so I decided to let the solution fly as a d3 plugin.
