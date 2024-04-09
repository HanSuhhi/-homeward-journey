// import { ref } from "vue";
// import { setMessage } from "@/matter";

// export function blackSay(model: string) {
//   const message: Message = {
//     type: "text",
//     texts: {
//       model,
//       classes: "black",
//     },
//   };

//   setMessage(message);
// }

// export function blackDiySay() {
//   const modelA = ref("");
//   const modelB = ref("");
//   const modelC = ref("");

//   setMessage({
//     type: "text",
//     texts: [
//       {
//         model: modelA,
//         init(finish) {
//           const answer = "....绝密";
//           let index = 0;

//           const intervalIndex = setInterval(() => {
//             modelA.value += answer[index++];
//             if (index === answer.length) {
//               clearInterval(intervalIndex);
//               setTimeout(() => {
//                 finish();
//               }, 1000);
//             }
//           }, 100);
//         },
//       },
//       {
//         model: modelB,
//         init(finish) {
//           const answer = "...撒网";
//           let index = 0;

//           const intervalIndex = setInterval(() => {
//             modelB.value += answer[index++];
//             if (index === answer.length) {
//               clearInterval(intervalIndex);
//               setTimeout(() => {
//                 finish();
//               }, 1000);
//             }
//           }, 100);
//         },
//       },
//       {
//         model: modelC,
//         classes: "shade",
//         init(finish) {
//           const answer = "...杀";
//           let index = 0;

//           const intervalIndex = setInterval(() => {
//             modelC.value += answer[index++];
//             if (index === answer.length) {
//               clearInterval(intervalIndex);
//               finish();
//             }
//           }, 100);
//         },
//       },
//     ],
//   });
// }
