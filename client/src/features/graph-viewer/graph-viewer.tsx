import React, { useEffect, useState } from 'react'
import Graph from "graphology";
import { Flex, Box, Text } from '@chakra-ui/react'
import { SigmaContainer, useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css"
import { useLayoutForce, useWorkerLayoutForce } from "@react-sigma/layout-force";
import { useLayoutCirclepack } from "@react-sigma/layout-circlepack";

import { useGetIdeasQuery } from '@gql/operations'

export const GraphViewer = () => {

  const Fa2: React.FC = () => {
    const { start, kill, isRunning } = useWorkerLayoutForce({});

    useEffect(() => {
      // start FA2
      start();
      return () => {
        // Kill FA2 on unmount
        kill();
      };
    }, [start, kill]);

    return null;
  };

  return (
    <Box border="1px solid red">
      <SigmaContainer style={{ height: "500px", width: "1000px" }}>
        <LoadGraph />
        <Fa2 />
        <GraphEvents />
      </SigmaContainer>
    </Box>
  )
}

export const LoadGraph = () => {
  const loadGraph = useLoadGraph();
  const [response, refetchIdeas] = useGetIdeasQuery()
  const { positions, assign } = useLayoutCirclepack();

  useEffect(() => {
    const graph = new Graph({
      multi: true
    });
    if (response.data?.ideas.length) {
      response.data.ideas.forEach((idea, i) => {
        graph.addNode(idea.id, { label: idea.title || 'Untitled', x: 0, y: 0, size: 10 });
      })

      response.data.ideas.forEach((idea) => {
        idea.toReferences.forEach((ref) => {
          graph.addEdge(idea.id, ref.toIdea.id, { size: 1 })
        })
      })
    }
    loadGraph(graph);
    assign()
  }, [response.data, loadGraph]);

  return null;
};


const GraphEvents: React.FC = () => {
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();
  const [draggedNode, setDraggedNode] = useState<string | null>(null);

  useEffect(() => {
    // Register the events
    registerEvents({
      downNode: (e) => {
        setDraggedNode(e.node);
        sigma.getGraph().setNodeAttribute(e.node, "highlighted", true);
      },
      mouseup: (e) => {
        if (draggedNode) {
          setDraggedNode(null);
          sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
        }
      },
      mousedown: (e) => {
        // Disable the autoscale at the first down interaction
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },
      mousemove: (e) => {
        if (draggedNode) {
          // Get new position of node
          const pos = sigma.viewportToGraph(e);
          sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
          sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

          // Prevent sigma to move camera:
          e.preventSigmaDefault();
          e.original.preventDefault();
          e.original.stopPropagation();
        }
      },
      touchup: (e) => {
        if (draggedNode) {
          setDraggedNode(null);
          sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
        }
      },
      touchdown: (e) => {
        // Disable the autoscale at the first down interaction
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },
      touchmove: (e) => {
        if (draggedNode) {
          // Get new position of node
          const pos = sigma.viewportToGraph(e);
          sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
          sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

          // Prevent sigma to move camera:
          // @ts-ignore
          e.preventSigmaDefault();
          e.original.preventDefault();
          e.original.stopPropagation();
        }
      },
    });
  }, [registerEvents, sigma, draggedNode]);

  return null;
};